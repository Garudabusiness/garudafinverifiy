"use client";

import { useEffect, useState } from "react";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { StatusBadge } from "../components/StatusBadge";
import { PriorityBadge } from "../components/PriorityBadge";
import { requests, assignments, users } from "@/lib/api";
import Link from "next/link";

interface Request {
  id: string;
  type: string;
  status: string;
  priority: string;
  subjectName: string;
  createdAt: string;
  assignments: any[];
}

interface Stats {
  totalRequests: number;
  pendingRequests: number;
  completedRequests: number;
  agents: number;
}

function AdminDashboardContent() {
  const [requestList, setRequestList] = useState<Request[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalRequests: 0,
    pendingRequests: 0,
    completedRequests: 0,
    agents: 0
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  const loadData = async () => {
    try {
      setLoading(true);
      const [reqData, agentsData] = await Promise.all([
        requests.list(0, 20, statusFilter || undefined, searchTerm || undefined),
        users.getAgents()
      ]);

      setRequestList(reqData.data);
      setStats({
        totalRequests: reqData.pagination.total,
        pendingRequests: reqData.data.filter((r: any) => r.status !== "COMPLETED" && r.status !== "REJECTED")
          .length,
        completedRequests: reqData.data.filter((r: any) => r.status === "COMPLETED").length,
        agents: (agentsData as any[]).length
      });
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [statusFilter, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
        <p className="text-slate-600">Manage verification requests, agents, and clients</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-slate-600">Total Requests</div>
          <div className="text-3xl font-bold text-slate-900 mt-2">{stats.totalRequests}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-slate-600">Pending</div>
          <div className="text-3xl font-bold text-yellow-600 mt-2">{stats.pendingRequests}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-slate-600">Completed</div>
          <div className="text-3xl font-bold text-green-600 mt-2">{stats.completedRequests}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-slate-600">Field Agents</div>
          <div className="text-3xl font-bold text-blue-600 mt-2">{stats.agents}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Search by subject name, ID, or loan ref..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
          >
            <option value="">All Statuses</option>
            <option value="DRAFT">Draft</option>
            <option value="ASSIGNED">Assigned</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="ON_HOLD">On Hold</option>
            <option value="COMPLETED">Completed</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Verification Requests</h2>
        </div>

        {loading ? (
          <div className="p-6 text-center text-slate-600">Loading...</div>
        ) : requestList.length === 0 ? (
          <div className="p-6 text-center text-slate-600">No requests found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Agents</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Created</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {requestList.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50">
                    <td className="px-6 py-3 text-sm font-mono text-slate-700">{req.id.slice(0, 8)}</td>
                    <td className="px-6 py-3 text-sm text-slate-900 font-medium">{req.subjectName}</td>
                    <td className="px-6 py-3 text-sm text-slate-700">{req.type.replace(/_/g, " ")}</td>
                    <td className="px-6 py-3 text-sm">
                      <StatusBadge status={req.status} />
                    </td>
                    <td className="px-6 py-3 text-sm">
                      <PriorityBadge priority={req.priority} />
                    </td>
                    <td className="px-6 py-3 text-sm text-slate-700">{req.assignments.length}</td>
                    <td className="px-6 py-3 text-sm text-slate-700">
                      {new Date(req.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3 text-sm">
                      <Link
                        href={`/admin/requests/${req.id}`}
                        className="text-brand hover:underline font-medium"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <Link
          href="/admin/agents"
          className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
        >
          <div className="text-lg font-semibold text-slate-900">Field Agents</div>
          <p className="text-slate-600 text-sm mt-2">Manage agents and assignments</p>
        </Link>
        <Link
          href="/admin/clients"
          className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
        >
          <div className="text-lg font-semibold text-slate-900">Clients</div>
          <p className="text-slate-600 text-sm mt-2">View client organizations</p>
        </Link>
        <Link
          href="/admin/requests"
          className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
        >
          <div className="text-lg font-semibold text-slate-900">Create Request</div>
          <p className="text-slate-600 text-sm mt-2">Create new verification request</p>
        </Link>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}
