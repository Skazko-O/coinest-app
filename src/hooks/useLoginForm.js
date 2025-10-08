import { useForm } from 'react-hook-form';

export const useLoginForm = () => {
  const rememberedEmail = localStorage.getItem('rememberedEmail') || '';
  const encodedPassword = localStorage.getItem('rememberedPassword');
  const rememberedPassword = encodedPassword ? atob(encodedPassword) : '';
  const remembered = rememberedEmail && rememberedPassword;

  return useForm({
    defaultValues: {
      email: rememberedEmail,
      password: rememberedPassword,
      rememberMe: remembered
    },
    mode: 'onSubmit'
  });
};
