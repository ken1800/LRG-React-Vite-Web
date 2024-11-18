import { Loader2 } from "lucide-react";

export const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center space-y-4">
      <Loader2 className="w-8 h-8 animate-spin mx-auto" />
      <p className="text-gray-600">Loading available properties...</p>
    </div>
  </div>
);
