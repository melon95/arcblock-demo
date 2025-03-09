import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';

import type { UserProfile } from './hooks/useProfile';

interface ProfileDisplayProps {
  isLoading: boolean;
  profile: UserProfile;
  onEdit: () => void;
}

export function ProfileDisplay({ isLoading, profile, onEdit }: ProfileDisplayProps) {
  return (
    <>
      <div className="flex flex-row items-center justify-between space-y-0 pb-6">
        <h2 className="text-2xl font-bold">个人资料</h2>
        <Button onClick={onEdit} variant="default" disabled={isLoading}>
          编辑
        </Button>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label>用户名</Label>
          {isLoading ? (
            <Skeleton className="h-5 w-[200px]" />
          ) : (
            <p className="text-sm text-gray-500">{profile.username}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>邮箱</Label>
          {isLoading ? (
            <Skeleton className="h-5 w-[250px]" />
          ) : (
            <p className="text-sm text-gray-500">{profile.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>手机号</Label>
          {isLoading ? (
            <Skeleton className="h-5 w-[150px]" />
          ) : (
            <p className="text-sm text-gray-500">{profile.phone || '-'}</p>
          )}
        </div>
      </div>
    </>
  );
}
