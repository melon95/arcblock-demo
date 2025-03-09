import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';

import { ProfileDisplay } from './display';
import { ProfileEdit } from './edit';
import { useProfile } from './hooks/useProfile';

function Profile() {
  const { profile, isLoading, error, getProfile, updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (newProfile: typeof profile) => {
    const success = await updateProfile(newProfile);
    if (success) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <Card className="p-6 mt-4">
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isEditing ? (
        <ProfileEdit profile={profile} onSubmit={handleSubmit} onCancel={handleCancel} />
      ) : (
        <ProfileDisplay isLoading={isLoading} profile={profile} onEdit={() => setIsEditing(true)} />
      )}
    </Card>
  );
}

export default Profile;
