

import { useState, useRef } from 'react';

export function useLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const btnRef = useRef(null);

  function togglePassword() {
    setShowPassword((prev) => !prev);
  }

  function handleRipple(e) {
    const btn = btnRef.current;
    if (!btn) return;

    const ripple = document.createElement('span');
    ripple.className = 'ripple';

    const size = Math.max(btn.offsetWidth, btn.offsetHeight);
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `width:${size}px; height:${size}px; left:${x}px; top:${y}px;`;
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Login:', { username, password });
  }

  return {
    username,
    setUsername,
    password,
    setPassword,
    showPassword,
    togglePassword,
    handleRipple,
    handleSubmit,
    btnRef,
  };
}