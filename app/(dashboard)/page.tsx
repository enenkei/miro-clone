'use client';
import React from 'react';
import EmptyOrg from './_components/empty-org';
import { useOrganization } from '@clerk/nextjs';
import BoardList from './_components/board-list';

type Props = {
  searchParams : {
    search? : string,
    favorites? : string
  }
}

export default function DashboardPage({searchParams} : Props) {
  const { organization } = useOrganization();
  return (
    <div className="flex flex-col gap-y-4 flex-1 h-[calc(100%-80px)] p-6">
      {!organization ? (<EmptyOrg />) : (
        <BoardList orgId={organization.id} query={searchParams} />
      )}
    </div>
  );
}