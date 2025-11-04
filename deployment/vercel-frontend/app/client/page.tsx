"use client";

import { useEffect, useState } from "react";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { StatusBadge } from "../components/StatusBadge";
import { PriorityBadge } from "../components/PriorityBadge";
import { requests, authStorage } from "@/lib/api";
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
}

function ClientDashboardContent() {
  const [requestList, setRequestList] = useState<Request[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalRequests: 0,
    pendingRequests: 0,
    completedRequests: 0
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    type: "loan",
    subjectName: "",
    subjectPhone: "",
    subjectAddress: "",
    city: "",
    state: "",
    pincode: "",
    loanRefNo: "",
    priority: "NORMAL"
  });

  const loadRequests = async () => {
    try {
      setLoading(true);
      const reqData = await requests.list(0, 20, statusFilter || undefined, searchTerm || undefined);

      setRequestList(reqData.data);
      setStats({
        totalRequests: reqData.pagination.total,
        pendingRequests: reqData.data.filter((r: any) => r.status !== "COMPLETED" && r.status !== "REJECTED")
          .length,
        completedRequests: reqData.data.filter((r: any) => r.status === "COMPLETED").length
      });
    } catch (error) {
      console.error("Failed to load requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const authState = authStorage.load();
      if (!authState?.user) throw new Error("Not authenticated");

      await requests.create({
        ...formData,
        requesterId: authState.user.id
      });

      setFormData({
        type: "loan",
        subjectName: "",
        subjectPhone: "",
        subjectAddress: "",
        city: "",
        state: "",
        pincode: "",
        loanRefNo: "",
        priority: "NORMAL"
      });
      setShowCreateForm(false);
      loadRequests();
    } catch (error) {
      console.error("Failed to create request:", error);
      alert("Failed to create request");
    }
  };

  useEffect(() => {
    loadRequests();
  }, [statusFilter, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Client Dashboard</h1>
          <p className="text-slate-600">Create and track your verification requests</p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-brand text-white px-6 py-2 rounded-lg hover:bg-brand-dark transition"
        >
          {showCreateForm ? "Cancel" : "Create Request"}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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
      </div>

      {/* Create Request Form */}
      {showCreateForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Create New Request</h2>
          <form onSubmit={handleCreateRequest} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Verification Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
              >
                <option value="loan">Loan</option>
                <option value="insurance_pre">Insurance Pre</option>
                <option value="insurance_post">Insurance Post</option>
                <option value="vehicle_inspection">Vehicle Inspection</option>
                <option value="vehicle_valuation">Vehicle Valuation</option>
                <option value="asset_verification">Asset Verification</option>
                <option value="vendor_hub_verification">Vendor Hub</option>
                <option value="documents_collection">Documents Collection</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Subject Name</label>
              <input
                type="text"
                required
                value={formData.subjectName}
                onChange={(e) => setFormData({ ...formData, subjectName: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
              <input
                type="tel"
                value={formData.subjectPhone}
                onChange={(e) => setFormData({ ...formData, subjectPhone: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Loan Ref No</label>
              <input
                type="text"
                value={formData.loanRefNo}
                onChange={(e) => setFormData({ ...formData, loanRefNo: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
              <input
                type="text"
                value={formData.subjectAddress}
                onChange={(e) => setFormData({ ...formData, subjectAddress: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">State</label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Pincode</label>
              <input
                type="text"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
              >
                <option value="LOW">Low</option>
                <option value="NORMAL">Normal</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
              </select>
            </div>

            <div className="md:col-span-2 flex gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 bg-brand text-white px-4 py-2 rounded-lg hover:bg-brand-dark transition font-medium"
              >
                Create Request
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="flex-1 bg-slate-200 text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-300 transition font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Search by subject name or ID..."
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
          <h2 className="text-lg font-semibold text-slate-900">My Requests</h2>
        </div>

        {loading ? (
          <div className="p-6 text-center text-slate-600">Loading...</div>
        ) : requestList.length === 0 ? (
          <div className="p-6 text-center text-slate-600">
            No requests yet.{" "}
            <button
              onClick={() => setShowCreateForm(true)}
              className="text-brand hover:underline font-medium"
            >
              Create one now
            </button>
          </div>
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
                        href={`/client/requests/${req.id}`}
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
    </div>
  );
}

export default function ClientPage() {
  return (
    <ProtectedRoute allowedRoles={["CLIENT"]}>
      <ClientDashboardContent />
    </ProtectedRoute>
  );
}
