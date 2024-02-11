import React from 'react';

interface AvatarProps {
    initials: string;
}

const Avatar: React.FC<AvatarProps> = ({ initials }) => {
    return (
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {initials}
        </div>
    );
};

export default Avatar;