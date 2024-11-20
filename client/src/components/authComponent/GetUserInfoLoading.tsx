import React from 'react';

interface GetUserInfoLoadingProps {
  isLoading: boolean;
}

const GetUserInfoLoading: React.FC<GetUserInfoLoadingProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-200 dark:bg-slate-800 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
    </div>
  );
};

export default GetUserInfoLoading;