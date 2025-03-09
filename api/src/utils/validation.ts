const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^1[3-9]\d{9}$/;
const USERNAME_REGEX = /^[a-zA-Z0-9]{2,16}$/;

export interface ValidationErrors {
  username?: string;
  email?: string;
  phone?: string;
}

export interface ProfileData {
  username: string;
  email: string;
  phone: string;
}

export function validateProfile(data: ProfileData): ValidationErrors | null {
  const errors: ValidationErrors = {};

  // 验证用户名
  if (!data.username) {
    errors.username = '用户名不能为空';
  } else if (!USERNAME_REGEX.test(data.username)) {
    errors.username = '用户名只能包含字母和数字且长度为2-16个字符';
  }

  // 验证邮箱
  if (!data.email) {
    errors.email = '邮箱不能为空';
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = '请输入有效的邮箱地址';
  }

  // 验证手机号
  if (data.phone && !PHONE_REGEX.test(data.phone)) {
    errors.phone = '请输入有效的手机号码';
  }

  return Object.keys(errors).length > 0 ? errors : null;
}
