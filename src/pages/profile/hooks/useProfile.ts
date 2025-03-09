import api from '@/libs/api';
import { useState } from 'react';
import { toast } from 'sonner';

export interface UserProfile {
  username: string;
  email: string;
  phone: string;
}

export interface FormErrors {
  username?: string;
  email?: string;
  phone?: string;
}

// 模拟网络延迟
const randomPromise = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000 * Math.random());
  });
};

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile>({
    username: '',
    email: '',
    phone: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const getProfile = async () => {
    setIsLoading(true);
    setError('');
    try {
      await randomPromise();
      const { data } = await api.get('/api/profile');
      setProfile(data);
    } catch (error) {
      setError('获取用户资料失败，请稍后重试');
      console.error('Failed to fetch profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (newProfile: UserProfile) => {
    setError('');
    try {
      await randomPromise();
      await api.post('/api/profile', newProfile);
      setProfile(newProfile);
      toast.success('保存成功');
      return true;
    } catch (error) {
      // 处理验证错误
      if (error.response?.status === 400 && error.response?.data?.errors) {
        const validationErrors = error.response.data.errors as ValidationErrors;
        const errorMessage = Object.values(validationErrors).filter(Boolean).join(', ');
        setError(errorMessage);
      } else {
        setError('保存失败，请稍后重试');
      }
      console.error('Failed to save profile:', error);
      return false;
    }
  };

  return {
    profile,
    isLoading,
    error,
    getProfile,
    updateProfile,
  };
}
