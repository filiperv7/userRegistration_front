import React from 'react';

interface UserProfileFilterProps {
  selectedProfile: number | null;
  setSelectedProfile: (profileId: number | null) => void;
}

export const UserProfileFilter: React.FC<UserProfileFilterProps> = ({
  selectedProfile,
  setSelectedProfile,
}) => {
  const profiles = [
    { id: 1, label: 'Admin' },
    { id: 2, label: 'User' },
  ];

  const selectProfile = (idProfile: number) => {
    if (idProfile === selectedProfile) {
      setSelectedProfile(null);
    } else {
      setSelectedProfile(idProfile);
    }
  };

  return (
    <div className="flex space-x-4 mb-4">
      {profiles.map((profile) => (
        <button
          key={profile.id}
          onClick={() => selectProfile(profile.id)}
          className={`p-2 rounded cursor-pointer ${
            selectedProfile === profile.id
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          {profile.label}
        </button>
      ))}
    </div>
  );
};