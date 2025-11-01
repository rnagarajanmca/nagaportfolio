"use client";

import React, { Component, type ReactNode } from "react";
import { CTAButton } from "./CTAButton";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console (in production, send to error tracking service like Sentry)
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    // In production, you would send this to an error tracking service:
    // if (process.env.NODE_ENV === "production") {
    //   Sentry.captureException(error, { contexts: { react: errorInfo } });
    // }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-screen items-center justify-center bg-background px-6">
          <div className="mx-auto max-w-md text-center">
            <div className="mb-6">
              <svg
                className="mx-auto h-16 w-16 text-muted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </div>
            <h1 className="mb-4 text-2xl font-semibold text-foreground">Something went wrong</h1>
            <p className="mb-8 text-muted">
              We encountered an unexpected error. Please try refreshing the page or contact us if the problem persists.
            </p>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mb-8 rounded-lg border border-border bg-surface p-4 text-left">
                <summary className="cursor-pointer text-sm font-medium text-muted">Error details (development only)</summary>
                <pre className="mt-2 overflow-auto text-xs text-muted">
                  {this.state.error.toString()}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
            <div className="flex flex-wrap justify-center gap-3">
              <CTAButton
                href="/"
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.href = "/";
                }}
              >
                Go to homepage
              </CTAButton>
              <CTAButton
                href="#"
                variant="secondary"
                onClick={() => window.location.reload()}
              >
                Refresh page
              </CTAButton>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

