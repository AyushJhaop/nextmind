"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Sparkles,
  Lock,
  LogOut,
  Users,
  MessageSquareText,
  Layers,
  Search,
  Filter,
  Eye,
  X,
  ArrowLeft,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [authChecking, setAuthChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  // Login form state
  const [email, setEmail] = useState("admin@nextmind.edu");
  const [accessCode, setAccessCode] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  // Dashboard data state
  const [loadingData, setLoadingData] = useState(false);
  const [overview, setOverview] = useState({
    summary: {
      totalRegistrations: 0,
      totalEnquiries: 0,
      newEnquiries: 0,
      confirmedRegistrations: 0,
    },
    programmeStats: [],
    registrations: [],
    enquiries: [],
  });

  // Filters & active tab
  const [activeTab, setActiveTab] = useState("registrations");
  const [searchQuery, setSearchQuery] = useState("");
  const [programmeFilter, setProgrammeFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const loadDashboardOverview = useCallback(async () => {
    setLoadingData(true);
    try {
      const res = await fetch("/api/admin/overview");
      if (res.status === 401) {
        setAuthenticated(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setOverview(data);
      }
    } catch (err) {
      console.error("Error loading admin overview:", err);
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch("/api/admin/auth");
        if (res.ok) {
          const data = await res.json();
          setAuthenticated(true);
          setAdminUser(data.admin);
          loadDashboardOverview();
        } else {
          setAuthenticated(false);
        }
      } catch {
        setAuthenticated(false);
      } finally {
        setAuthChecking(false);
      }
    }
    checkSession();
  }, [loadDashboardOverview]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoggingIn(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, accessCode }),
      });
      const data = await res.json();
      if (!res.ok) {
        setLoginError(
          data.error || "Invalid credentials. Please check your access code."
        );
        return;
      }
      setAuthenticated(true);
      setAdminUser(data.admin);
      loadDashboardOverview();
    } catch {
      setLoginError("Unable to reach authentication server.");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setAuthenticated(false);
    setAdminUser(null);
    setAccessCode("");
  };

  const handleStatusChange = async (type, id, nextStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/admin/overview", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, id, status: nextStatus }),
      });
      if (res.ok) {
        await loadDashboardOverview();
      }
    } finally {
      setUpdatingId(null);
    }
  };

  // Filtered registrations
  const filteredRegistrations = overview.registrations.filter((reg) => {
    const matchesSearch =
      !searchQuery ||
      reg.user?.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.user?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.user?.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.registrationReference
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesProg =
      programmeFilter === "ALL" ||
      reg.programme?.slug === programmeFilter ||
      reg.programme?.title === programmeFilter;

    const matchesStatus =
      statusFilter === "ALL" || reg.status === statusFilter;

    return matchesSearch && matchesProg && matchesStatus;
  });

  // Filtered enquiries
  const filteredEnquiries = overview.enquiries.filter((enq) => {
    const matchesSearch =
      !searchQuery ||
      enq.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enq.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enq.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enq.message?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesProg =
      programmeFilter === "ALL" ||
      enq.programmeInterest?.toLowerCase() === programmeFilter.toLowerCase();

    const matchesStatus =
      statusFilter === "ALL" || enq.status === statusFilter;

    return matchesSearch && matchesProg && matchesStatus;
  });

  if (authChecking) {
    return (
      <div className="min-h-screen bg-[#FFF7EB] flex items-center justify-center p-8">
        <div className="rounded-3xl bg-[#F8F0E3] px-8 py-6 font-bold text-[#0B382A]">
          Verifying NEXTMIND Admin Session...
        </div>
      </div>
    );
  }

  // PROTECTED LOGIN GATE
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#0B382A] text-[#FFF7EB] flex flex-col justify-center items-center p-5 sm:p-8">
        <div className="w-full max-w-md rounded-3xl bg-[#FFF7EB] text-[#153D30] p-7 sm:p-9 shadow-[0_28px_70px_-15px_rgba(0,0,0,0.5)]">
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-decoration-none"
            >
              <span className="w-9 h-9 rounded-xl bg-[#0B382A] text-[#FFF7EB] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#C9D9B9]" aria-hidden="true" />
              </span>
              <span
                className="font-extrabold text-xl text-[#0B382A]"
                style={{ fontFamily: "'Manrope', 'DM Sans', sans-serif" }}
              >
                NEXT<span className="text-[#174B38]">MIND</span>
              </span>
            </Link>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9D9B9]/65 text-[#082F24] text-xs font-extrabold">
              <Lock className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Protected Portal</span>
            </span>
          </div>

          <h1
            className="text-2xl sm:text-3xl font-extrabold text-[#0B382A] m-0"
            style={{ fontFamily: "'Manrope', 'DM Sans', sans-serif" }}
          >
            Admin Sign In
          </h1>
          <p className="mt-2 text-sm text-[#153D30]/85 m-0">
            Authenticate with your NEXTMIND administrator credentials to manage
            programme registrations and advisor enquiries.
          </p>

          {loginError && (
            <div
              role="alert"
              className="mt-4 rounded-xl bg-red-50 border border-red-400 p-3 text-xs font-bold text-red-900"
            >
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="admin-email"
                className="block text-xs font-extrabold uppercase tracking-wider text-[#0B382A] mb-1.5"
              >
                Administrator Email
              </label>
              <input
                id="admin-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl bg-[#FFFFFF] border border-[#174B38]/25 px-4 py-3 text-sm font-medium text-[#153D30]"
              />
            </div>

            <div>
              <label
                htmlFor="admin-code"
                className="block text-xs font-extrabold uppercase tracking-wider text-[#0B382A] mb-1.5"
              >
                Admin Access Code
              </label>
              <input
                id="admin-code"
                type="password"
                required
                placeholder="Enter ADMIN_ACCESS_CODE"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                className="w-full rounded-xl bg-[#FFFFFF] border border-[#174B38]/25 px-4 py-3 text-sm font-medium text-[#153D30]"
              />
            </div>

            <div className="rounded-xl bg-[#F8F0E3] p-3.5 border border-[#174B38]/15 flex items-center justify-between gap-2 text-xs">
              <div>
                <span className="block font-bold text-[#0B382A]">
                  Default Local Evaluator Credentials:
                </span>
                <code className="text-[#174B38]">
                  admin@nextmind.edu / NEXTMIND-ADMIN-2026
                </code>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEmail("admin@nextmind.edu");
                  setAccessCode("NEXTMIND-ADMIN-2026");
                }}
                className="px-3 py-1.5 rounded-lg bg-[#C9D9B9] text-[#082F24] font-extrabold shrink-0 cursor-pointer"
              >
                Auto-Fill
              </button>
            </div>

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full py-3.5 px-6 rounded-full bg-[#0B382A] hover:bg-[#174B38] text-[#FFF7EB] font-extrabold text-sm shadow-lg transition-all cursor-pointer"
            >
              {loggingIn ? "Verifying Session..." : "Sign In to Dashboard"}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#174B38]/12 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#174B38] hover:text-[#0B382A]"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Return to NEXTMIND Homepage</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // AUTHENTICATED ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-[#FFF7EB] text-[#153D30]">
      {/* Top Bar */}
      <header className="bg-[#0B382A] text-[#FFF7EB] py-4 px-5 sm:px-8 lg:px-12 shadow-md">
        <div className="max-w-[1380px] mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-decoration-none"
            >
              <span className="w-9 h-9 rounded-xl bg-[#174B38] border border-[#C9D9B9]/30 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#C9D9B9]" aria-hidden="true" />
              </span>
              <span
                className="font-extrabold text-xl text-[#FFF7EB]"
                style={{ fontFamily: "'Manrope', 'DM Sans', sans-serif" }}
              >
                NEXT<span className="text-[#C9D9B9]">MIND</span>
              </span>
            </Link>
            <span className="px-3 py-1 rounded-full bg-[#174B38] text-[#C9D9B9] text-xs font-bold">
              Admissions &amp; Lead Management
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={loadDashboardOverview}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#174B38] hover:bg-[#C9D9B9] text-[#FFF7EB] hover:text-[#082F24] text-xs font-bold transition-colors cursor-pointer"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${loadingData ? "animate-spin" : ""}`}
                aria-hidden="true"
              />
              <span>Refresh</span>
            </button>

            <Link
              href="/"
              className="px-3.5 py-2 rounded-full bg-[#FFF7EB]/12 hover:bg-[#FFF7EB]/20 text-[#FFF7EB] text-xs font-bold"
            >
              View Live Site
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#C9D9B9] text-[#082F24] text-xs font-extrabold cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Sign Out ({adminUser?.email || "Admin"})</span>
            </button>
          </div>
        </div>
      </header>

      <main id="main-content" className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 py-10 space-y-10">
        {/* KPI Summary Cards */}
        <section aria-label="Admissions overview metrics">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="rounded-2xl bg-[#0B382A] text-[#FFF7EB] p-6 shadow-md">
              <div className="flex items-center justify-between text-[#C9D9B9] mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">
                  Total Registrations
                </span>
                <Users className="w-5 h-5" aria-hidden="true" />
              </div>
              <p
                className="text-4xl font-extrabold m-0"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {overview.summary.totalRegistrations}
              </p>
              <p className="mt-1 text-xs text-[#C9D9B9] m-0">
                {overview.summary.confirmedRegistrations} Confirmed / Active
              </p>
            </div>

            <div className="rounded-2xl bg-[#F8F0E3] p-6 border border-[#174B38]/15">
              <div className="flex items-center justify-between text-[#174B38] mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">
                  Total Advisor Enquiries
                </span>
                <MessageSquareText className="w-5 h-5" aria-hidden="true" />
              </div>
              <p
                className="text-4xl font-extrabold text-[#0B382A] m-0"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {overview.summary.totalEnquiries}
              </p>
              <p className="mt-1 text-xs text-[#174B38] font-semibold m-0">
                {overview.summary.newEnquiries} New awaiting response
              </p>
            </div>

            {/* Programme-wise registrations cards */}
            <div className="sm:col-span-2 rounded-2xl bg-[#F8F0E3] p-6 border border-[#174B38]/15">
              <div className="flex items-center justify-between text-[#174B38] mb-3">
                <span className="text-xs font-bold uppercase tracking-wider">
                  Programme-Wise Registrations &amp; Demand
                </span>
                <Layers className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {overview.programmeStats.map((prog) => (
                  <div
                    key={prog.id}
                    className="rounded-xl bg-[#FFF7EB] p-3.5 border border-[#174B38]/12"
                  >
                    <p className="text-xs font-extrabold text-[#0B382A] truncate m-0">
                      {prog.title}
                    </p>
                    <div
                      className="mt-2 flex items-baseline justify-between"
                      style={{ fontVariantNumeric: "tabular-nums" }}
                    >
                      <span className="text-2xl font-extrabold text-[#0B382A]">
                        {prog.registrationsCount}
                      </span>
                      <span className="text-[11px] font-bold text-[#174B38]">
                        {prog.enquiriesCount} enquiries
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Controls Bar: Tabs, Search & Programme/Status Filters */}
        <section className="rounded-3xl bg-[#F8F0E3] p-6 sm:p-8 border border-[#174B38]/15 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* View Switcher Tabs */}
            <div className="inline-flex rounded-full bg-[#FFF7EB] p-1.5 border border-[#174B38]/15 self-start">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("registrations");
                  setStatusFilter("ALL");
                }}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                  activeTab === "registrations"
                    ? "bg-[#0B382A] text-[#FFF7EB]"
                    : "text-[#153D30] hover:bg-[#C9D9B9]/40"
                }`}
              >
                Programme Registrations ({overview.registrations.length})
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("enquiries");
                  setStatusFilter("ALL");
                }}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                  activeTab === "enquiries"
                    ? "bg-[#0B382A] text-[#FFF7EB]"
                    : "text-[#153D30] hover:bg-[#C9D9B9]/40"
                }`}
              >
                Advisor Enquiries ({overview.enquiries.length})
              </button>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative min-w-[240px] flex-1 sm:flex-initial">
                <Search
                  className="w-4 h-4 text-[#174B38] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  aria-label="Search leads by name, email, phone, or reference"
                  placeholder="Search name, email, ref..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full bg-[#FFFFFF] border border-[#174B38]/25 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#153D30]"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#174B38]" aria-hidden="true" />
                <select
                  aria-label="Filter by programme"
                  value={programmeFilter}
                  onChange={(e) => setProgrammeFilter(e.target.value)}
                  className="rounded-full bg-[#FFFFFF] border border-[#174B38]/25 px-4 py-2.5 text-xs sm:text-sm font-bold text-[#0B382A]"
                >
                  <option value="ALL">All Programmes</option>
                  <option value="AI Foundations">AI Foundations</option>
                  <option value="AI & Automation">AI &amp; Automation</option>
                  <option value="Digital Product & Technology">
                    Digital Product &amp; Technology
                  </option>
                </select>
              </div>

              <select
                aria-label="Filter by status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-full bg-[#FFFFFF] border border-[#174B38]/25 px-4 py-2.5 text-xs sm:text-sm font-bold text-[#0B382A]"
              >
                <option value="ALL">All Statuses</option>
                {activeTab === "registrations" ? (
                  <>
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="IN_REVIEW">IN_REVIEW</option>
                    <option value="ENROLLED">ENROLLED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </>
                ) : (
                  <>
                    <option value="NEW">NEW</option>
                    <option value="CONTACTED">CONTACTED</option>
                    <option value="ADVISING_SCHEDULED">
                      ADVISING_SCHEDULED
                    </option>
                    <option value="RESOLVED">RESOLVED</option>
                  </>
                )}
              </select>
            </div>
          </div>

          {/* TAB 1: PROGRAMME REGISTRATIONS TABLE (modern-web-guidance responsive-table) */}
          {activeTab === "registrations" && (
            <div
              tabIndex={0}
              role="region"
              aria-labelledby="registrations-table-caption"
              className="nm-table-wrapper"
            >
              <table
                className="nm-table text-sm"
                style={{
                  "--label-2": "'Reference'",
                  "--label-3": "'Programme'",
                  "--label-4": "'Education'",
                  "--label-5": "'Status'",
                  "--label-6": "'Details'",
                }}
              >
                <caption
                  id="registrations-table-caption"
                  className="visually-hidden"
                >
                  Submitted NEXTMIND programme registrations
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Learner</th>
                    <th scope="col">Reference</th>
                    <th scope="col">Programme</th>
                    <th scope="col">Education &amp; Role</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRegistrations.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-[#174B38]">
                        No matching registrations found.
                      </td>
                    </tr>
                  ) : (
                    filteredRegistrations.map((reg) => (
                      <tr key={reg.id}>
                        <th scope="row">
                          <div className="font-extrabold text-[#0B382A]">
                            {reg.user?.fullName}
                          </div>
                          <div className="text-xs text-[#174B38] font-normal">
                            {reg.user?.email} • {reg.user?.phone}
                          </div>
                        </th>
                        <td>
                          <span className="px-2.5 py-1 rounded-lg bg-[#F8F0E3] border border-[#174B38]/20 font-extrabold text-xs text-[#0B382A]">
                            {reg.registrationReference}
                          </span>
                        </td>
                        <td className="font-bold text-[#0B382A]">
                          {reg.programme?.title}
                        </td>
                        <td>
                          <div className="text-xs font-semibold text-[#153D30]">
                            {reg.educationLevel}
                          </div>
                          {reg.occupation && (
                            <div className="text-xs text-[#174B38]">
                              {reg.occupation}
                            </div>
                          )}
                        </td>
                        <td>
                          <select
                            aria-label={`Change status for ${reg.user?.fullName}`}
                            value={reg.status}
                            disabled={updatingId === reg.id}
                            onChange={(e) =>
                              handleStatusChange(
                                "registration",
                                reg.id,
                                e.target.value
                              )
                            }
                            className="rounded-lg bg-[#F8F0E3] border border-[#174B38]/25 px-2.5 py-1.5 text-xs font-extrabold text-[#0B382A]"
                          >
                            <option value="CONFIRMED">CONFIRMED</option>
                            <option value="IN_REVIEW">IN_REVIEW</option>
                            <option value="ENROLLED">ENROLLED</option>
                            <option value="CANCELLED">CANCELLED</option>
                          </select>
                        </td>
                        <td>
                          <button
                            type="button"
                            onClick={() => setSelectedRegistration(reg)}
                            aria-label={`Inspect registration ${reg.registrationReference}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B382A] hover:bg-[#174B38] text-[#FFF7EB] text-xs font-bold cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>View Details</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 2: ADVISOR ENQUIRIES TABLE */}
          {activeTab === "enquiries" && (
            <div
              tabIndex={0}
              role="region"
              aria-labelledby="enquiries-table-caption"
              className="nm-table-wrapper"
            >
              <table
                className="nm-table text-sm"
                style={{
                  "--label-2": "'Programme Interest'",
                  "--label-3": "'Education'",
                  "--label-4": "'Preferred Channel'",
                  "--label-5": "'Message'",
                  "--label-6": "'Status'",
                }}
              >
                <caption
                  id="enquiries-table-caption"
                  className="visually-hidden"
                >
                  Submitted NEXTMIND advisor enquiries
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Lead Contact</th>
                    <th scope="col">Programme Interest</th>
                    <th scope="col">Education Level</th>
                    <th scope="col">Preferred Contact</th>
                    <th scope="col">Message</th>
                    <th scope="col">Enquiry Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEnquiries.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-[#174B38]">
                        No matching advisor enquiries found.
                      </td>
                    </tr>
                  ) : (
                    filteredEnquiries.map((enq) => (
                      <tr key={enq.id}>
                        <th scope="row">
                          <div className="font-extrabold text-[#0B382A]">
                            {enq.fullName}
                          </div>
                          <div className="text-xs text-[#174B38] font-normal">
                            {enq.email} • {enq.phone}
                          </div>
                        </th>
                        <td className="font-bold text-[#0B382A]">
                          {enq.programmeInterest}
                        </td>
                        <td className="text-xs font-semibold">
                          {enq.educationLevel}
                        </td>
                        <td>
                          <span className="px-2.5 py-1 rounded-full bg-[#C9D9B9]/55 text-[#082F24] text-xs font-bold">
                            {enq.preferredContactMethod}
                          </span>
                        </td>
                        <td className="max-w-xs text-xs text-[#153D30]">
                          {enq.message || "—"}
                        </td>
                        <td>
                          <select
                            aria-label={`Change enquiry status for ${enq.fullName}`}
                            value={enq.status}
                            disabled={updatingId === enq.id}
                            onChange={(e) =>
                              handleStatusChange(
                                "enquiry",
                                enq.id,
                                e.target.value
                              )
                            }
                            className="rounded-lg bg-[#F8F0E3] border border-[#174B38]/25 px-2.5 py-1.5 text-xs font-extrabold text-[#0B382A]"
                          >
                            <option value="NEW">NEW</option>
                            <option value="CONTACTED">CONTACTED</option>
                            <option value="ADVISING_SCHEDULED">
                              ADVISING_SCHEDULED
                            </option>
                            <option value="RESOLVED">RESOLVED</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      {/* Individual Registration Details Modal */}
      {selectedRegistration && (
        <div
          className="fixed inset-0 z-50 bg-[#082F24]/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedRegistration(null)}
        >
          <div
            className="w-full max-w-lg rounded-3xl bg-[#FFF7EB] border border-[#174B38]/25 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#0B382A] text-[#FFF7EB] px-6 py-5 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C9D9B9]">
                  Registration Record
                </span>
                <h2 className="text-xl font-extrabold m-0">
                  {selectedRegistration.registrationReference}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRegistration(null)}
                aria-label="Close registration details"
                className="w-9 h-9 rounded-full bg-[#174B38] text-[#FFF7EB] flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-sm">
              <div className="rounded-2xl bg-[#F8F0E3] p-4 space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-[#174B38] font-bold">Full Name:</span>
                  <span className="font-extrabold text-[#0B382A]">
                    {selectedRegistration.user?.fullName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#174B38] font-bold">Email:</span>
                  <span className="font-bold text-[#0B382A]">
                    {selectedRegistration.user?.email}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#174B38] font-bold">Phone:</span>
                  <span className="font-bold text-[#0B382A]">
                    {selectedRegistration.user?.phone}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#174B38] font-bold">Programme:</span>
                  <span className="font-extrabold text-[#0B382A]">
                    {selectedRegistration.programme?.title}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#174B38] font-bold">
                    Education Level:
                  </span>
                  <span className="font-semibold text-[#0B382A]">
                    {selectedRegistration.educationLevel}
                  </span>
                </div>
                {selectedRegistration.occupation && (
                  <div className="flex justify-between">
                    <span className="text-[#174B38] font-bold">Occupation:</span>
                    <span className="font-semibold text-[#0B382A]">
                      {selectedRegistration.occupation}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#174B38] font-bold">Status:</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#C9D9B9] text-[#082F24] font-extrabold text-xs">
                    {selectedRegistration.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#174B38] font-bold">Submitted At:</span>
                  <span className="text-xs text-[#153D30]">
                    {new Date(selectedRegistration.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedRegistration(null)}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#0B382A] text-[#FFF7EB] font-bold text-xs cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#C9D9B9]" aria-hidden="true" />
                  <span>Close Record</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

