
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-safeminor-primary mb-4">404</h1>
          <p className="text-2xl text-gray-700 mb-6">Oops! Page not found</p>
          <p className="text-gray-500 mb-8">
            We couldn't find the page you were looking for. It might have been moved or doesn't exist.
          </p>
          <Button asChild className="bg-safeminor-primary hover:bg-safeminor-secondary">
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
