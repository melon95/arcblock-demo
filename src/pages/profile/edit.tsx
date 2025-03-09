import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EMAIL_REGEX, PHONE_REGEX, USERNAME_REGEX } from '@/constants/validation';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

import type { FormErrors, UserProfile } from './hooks/useProfile';

interface ProfileEditProps {
  profile: UserProfile;
  onSubmit: (profile: UserProfile) => Promise<void>;
  onCancel: () => void;
}

export function ProfileEdit({ profile, onSubmit, onCancel }: ProfileEditProps) {
  const [formData, setFormData] = useState<UserProfile>(profile);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSaving, setIsSaving] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.username) {
      newErrors.username = '用户名不能为空';
    } else if (!USERNAME_REGEX.test(formData.username)) {
      newErrors.username = '用户名只能包含字母和数字且长度为2-16个字符';
    }

    if (!formData.email) {
      newErrors.email = '邮箱不能为空';
    } else if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }

    if (formData.phone && !PHONE_REGEX.test(formData.phone)) {
      newErrors.phone = '请输入有效的手机号码';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSaving(true);
      try {
        await onSubmit(formData);
      } finally {
        setIsSaving(false);
      }
    }
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between space-y-0 pb-6">
        <h2 className="text-2xl font-bold">编辑个人资料</h2>
        <div className="space-x-2">
          <Button onClick={onCancel} variant="outline" disabled={isSaving}>
            取消
          </Button>
          <Button onClick={handleSubmit} variant="default" disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                保存中
              </>
            ) : (
              '保存'
            )}
          </Button>
        </div>
      </div>

      <form className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="username">
            用户名 <span className="text-red-500">*</span>
          </Label>
          <div className="space-y-1">
            <Input
              id="username"
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="请输入用户名"
              className={errors.username ? 'border-red-500' : ''}
            />
            {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            邮箱 <span className="text-red-500">*</span>
          </Label>
          <div className="space-y-1">
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="请输入邮箱"
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">手机号</Label>
          {/* TODO: 多国家手机号 */}
          <div className="space-y-1">
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="请输入手机号"
              className={errors.phone ? 'border-red-500' : ''}
            />
            {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
          </div>
        </div>
      </form>
    </>
  );
}
