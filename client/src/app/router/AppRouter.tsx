import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<div>home</div>} />
        <Route path="room" element={<div>room</div>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
