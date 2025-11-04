const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    skip: number;
    take: number;
    pages: number;
  };
}

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: Error
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
};

const makeRequest = async <T = any>(
  path: string,
  options: RequestInit = {}
): Promise<T> => {
  // Validate API URL is configured
  if (!API_URL) {
    throw new ApiError(
      "API configuration error: NEXT_PUBLIC_API_URL is not set. Please configure your backend API URL."
    );
  }

  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json"
  };

  if (options.headers instanceof Headers) {
    options.headers.forEach((value, key) => {
      headers[key] = value;
    });
  } else if (typeof options.headers === "object" && options.headers !== null) {
    Object.assign(headers, options.headers);
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers,
      signal: AbortSignal.timeout(15000) // 15 second timeout
    });

    let data: any;
    try {
      data = await response.json();
    } catch {
      throw new ApiError(
        "Invalid server response. Please try again.",
        response.status
      );
    }

    if (!response.ok) {
      throw new ApiError(
        data.message || `API request failed: ${response.statusText}`,
        response.status
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof TypeError) {
      throw new ApiError(
        "Failed to connect to the server. Please check your connection.",
        undefined,
        error as Error
      );
    }

    throw new ApiError(
      error instanceof Error ? error.message : "An unexpected error occurred",
      undefined,
      error instanceof Error ? error : undefined
    );
  }
};

// Auth API
export const auth = {
  login: (identifier: string, password: string) =>
    makeRequest<{ accessToken: string; refreshToken: string; user: any }>(
      "/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ identifier, password })
      }
    )
};

// Users API
export const users = {
  getMe: () => makeRequest("/users/me"),
  getAgents: (orgId?: string) => {
    const query = orgId ? `?orgId=${orgId}` : "";
    return makeRequest(`/users/agents${query}`);
  },
  getClients: () => makeRequest("/users/clients"),
  getUser: (id: string) => makeRequest(`/users/${id}`)
};

// Requests API
export const requests = {
  list: (skip = 0, take = 20, status?: string, search?: string) => {
    const params = new URLSearchParams();
    params.append("skip", String(skip));
    params.append("take", String(take));
    if (status) params.append("status", status);
    if (search) params.append("search", search);
    return makeRequest<PaginatedResponse<any>>(`/requests?${params.toString()}`);
  },
  create: (data: any) =>
    makeRequest("/requests", {
      method: "POST",
      body: JSON.stringify(data)
    }),
  get: (id: string) => makeRequest(`/requests/${id}`),
  update: (id: string, data: any) =>
    makeRequest(`/requests/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data)
    })
};

// Assignments API
export const assignments = {
  create: (requestId: string, agentId: string) =>
    makeRequest("/assignments", {
      method: "POST",
      body: JSON.stringify({ requestId, agentId })
    }),
  myAssignments: (status?: string, skip = 0, take = 20) => {
    const params = new URLSearchParams();
    params.append("skip", String(skip));
    params.append("take", String(take));
    if (status) params.append("status", status);
    return makeRequest<PaginatedResponse<any>>(`/assignments/my-assignments?${params.toString()}`);
  },
  get: (id: string) => makeRequest(`/assignments/${id}`),
  updateStatus: (id: string, status: string) =>
    makeRequest(`/assignments/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status })
    }),
  getByRequest: (requestId: string) => makeRequest(`/assignments/request/${requestId}`)
};

// Evidence API
export const evidence = {
  upload: async (requestId: string, kind: string, file: File, gpsLat?: number, gpsLng?: number) => {
    const token = getToken();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("requestId", requestId);
    formData.append("kind", kind);
    if (gpsLat) formData.append("gpsLat", String(gpsLat));
    if (gpsLng) formData.append("gpsLng", String(gpsLng));

    const headers: HeadersInit = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/evidence/upload`, {
      method: "POST",
      headers,
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Upload failed");
    }

    return data;
  },
  getByRequest: (requestId: string, kind?: string) => {
    const query = kind ? `?kind=${kind}` : "";
    return makeRequest(`/evidence/request/${requestId}${query}`);
  },
  get: (id: string) => makeRequest(`/evidence/${id}`),
  delete: (id: string) =>
    makeRequest(`/evidence/${id}/delete`, {
      method: "POST"
    })
};

// Auth Storage utility
export const authStorage = {
  setToken: (token: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", token);
    }
  },
  getToken: getToken,
  removeToken: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
    }
  },
  load: () => {
    if (typeof window === "undefined") return null;
    const token = localStorage.getItem("accessToken");
    const user = localStorage.getItem("user");
    return {
      token,
      user: user ? JSON.parse(user) : null
    };
  },
  save: (token: string, user: any) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", token);
      localStorage.setItem("user", JSON.stringify(user));
    }
  },
  clear: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    }
  }
};
