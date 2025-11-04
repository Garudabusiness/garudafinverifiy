"use client";

import { useEffect, useState } from "react";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { StatusBadge } from "../components/StatusBadge";
import { assignments, evidence } from "@/lib/api";
import Link from "next/link";

interface Assignment {
  id: string;
  requestId: string;
  status: string;
  assignedAt: string;
  startedAt?: string;
  completedAt?: string;
  request: {
    id: string;
    type: string;
    status: string;
    subjectName: string;
    subjectPhone?: string;
    subjectAddress?: string;
    city?: string;
    state?: string;
    pincode?: string;
  };
}

interface Stats {
  totalAssignments: number;
  activeAssignments: number;
  completedAssignments: number;
}

function FieldAgentDashboardContent() {
  const [assignmentList, setAssignmentList] = useState<Assignment[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalAssignments: 0,
    activeAssignments: 0,
    completedAssignments: 0
  });
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("");

  const loadAssignments = async () => {
    try {
      setLoading(true);
      const assignData = await assignments.myAssignments(statusFilter || undefined, 0, 20);

      setAssignmentList(assignData.data);
      setStats({
        totalAssignments: assignData.pagination.total,
        activeAssignments: assignData.data.filter(
          (a: any) => a.status === "ASSIGNED" || a.status === "IN_PROGRESS"
        ).length,
        completedAssignments: assignData.data.filter((a: any) => a.status === "COMPLETED").length
      });
    } catch (error) {
      console.error("Failed to load assignments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssignments();
  }, [statusFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Field Agent Dashboard</h1>
        <p className="text-slate-600">View your assigned jobs and upload evidence</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-slate-600">Total Assignments</div>
          <div className="text-3xl font-bold text-slate-900 mt-2">{stats.totalAssignments}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-slate-600">Active</div>
          <div className="text-3xl font-bold text-yellow-600 mt-2">{stats.activeAssignments}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-slate-600">Completed</div>
          <div className="text-3xl font-bold text-green-600 mt-2">{stats.completedAssignments}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full md:w-auto px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
        >
          <option value="">All Statuses</option>
          <option value="ASSIGNED">Assigned</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-6 text-center text-slate-600">Loading...</div>
        ) : assignmentList.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center text-slate-600">
            No assignments found. Check back later for new jobs!
          </div>
        ) : (
          assignmentList.map((assignment) => (
            <div key={assignment.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{assignment.request.subjectName}</h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Type: <span className="font-medium">{assignment.request.type.replace(/_/g, " ")}</span>
                  </p>
                  {assignment.request.subjectPhone && (
                    <p className="text-sm text-slate-600">
                      Phone: <span className="font-medium">{assignment.request.subjectPhone}</span>
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <div className="inline-block mb-2">
                    <StatusBadge status={assignment.status} />
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Assigned: {new Date(assignment.assignedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Location Details */}
              <div className="bg-slate-50 rounded p-4 mb-4">
                <h4 className="text-sm font-semibold text-slate-900 mb-2">Location Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  {assignment.request.subjectAddress && (
                    <p>
                      <span className="text-slate-600">Address:</span> {assignment.request.subjectAddress}
                    </p>
                  )}
                  {assignment.request.city && (
                    <p>
                      <span className="text-slate-600">City:</span> {assignment.request.city}
                    </p>
                  )}
                  {assignment.request.state && (
                    <p>
                      <span className="text-slate-600">State:</span> {assignment.request.state}
                    </p>
                  )}
                  {assignment.request.pincode && (
                    <p>
                      <span className="text-slate-600">Pincode:</span> {assignment.request.pincode}
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Link
                  href={`/field/assignment/${assignment.id}`}
                  className="flex-1 bg-brand text-white px-4 py-2 rounded-lg hover:bg-brand-dark transition font-medium text-center"
                >
                  View Details
                </Link>
                {assignment.status === "ASSIGNED" && (
                  <button
                    onClick={async () => {
                      try {
                        await assignments.updateStatus(assignment.id, "IN_PROGRESS");
                        loadAssignments();
                      } catch (error) {
                        console.error("Failed to update status:", error);
                        alert("Failed to update assignment status");
                      }
                    }}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                  >
                    Start Job
                  </button>
                )}
                {assignment.status === "IN_PROGRESS" && (
                  <button
                    onClick={async () => {
                      if (confirm("Are you sure the job is complete?")) {
                        try {
                          await assignments.updateStatus(assignment.id, "COMPLETED");
                          loadAssignments();
                        } catch (error) {
                          console.error("Failed to complete assignment:", error);
                          alert("Failed to complete assignment");
                        }
                      }
                    }}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition font-medium"
                  >
                    Mark Complete
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default function FieldPage() {
  return (
    <ProtectedRoute allowedRoles={["FIELD"]}>
      <FieldAgentDashboardContent />
    </ProtectedRoute>
  );
}
