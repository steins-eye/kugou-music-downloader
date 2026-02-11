// src/components/Layout.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useSearch } from '../contexts/SearchContext';
import SearchWithSuggestions from './SearchWithSuggestions';
import BottomPlayer from './BottomPlayer';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const { handleSearch: contextHandleSearch } = useSearch();

  const handleLogout = () => {
    window.location.href = '/';
    logout();
  };

  const handleSearchSubmit = (keyword) => {
    if (keyword?.trim()) {
      contextHandleSearch(keyword.trim());
    }
  };

  return (
    <div className="app-layout">
      {/* 背景效果 */}
      <div className="app-background">
        <div className="gradient-overlay"></div>
        <div className="floating-elements">
          {[...Array(3)].map((_, i) => (
            <div key={i} className={`floating-element app-element-${i + 1}`}></div>
          ))}
        </div>
      </div>
      
      {/* 主要内容区域 */}
      <div className="app-container glass-effect">
        <header className="app-header">
          <div className="header-left">
            <div className="logo">
              <Link to="/">🎵 音乐下载器</Link>
            </div>
            {location.pathname === '/' && (
              <div className="header-search-container">
                <SearchWithSuggestions 
                  onSearch={handleSearchSubmit}
                  disabled={false}
                  placeholder="搜索歌曲、歌手、专辑..."
                />
              </div>
            )}
          </div>
          <nav className="nav">
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''}
            >
              首页
            </Link>
            {user && (
              <>
                <div className="user-profile">
                  <div className="user-avatar">
                    <img 
                      src={user.profile?.avatarUrl || user.profile?.pic || '/default-avatar.png'} 
                      alt="用户头像" 
                      onError={(e) => {
                        e.target.src = '/default-avatar.png';
                      }}
                    />
                  </div>
                  <span className="user-nickname">
                    {user.profile?.nickname || user.profile?.k_nickname || user.account?.userName || '用户'}
                  </span>
                </div>
                <button onClick={handleLogout} className="logout-btn glass-button">
                  退出登录
                </button>
              </>
            )}
          </nav>
        </header>
        
        <main className="app-main">
          {children}
        </main>
        
        <footer className="app-footer">
          <p>© 2026 音乐下载器 - 享受高品质音乐体验</p>
        </footer>
      </div>
      
      {/* 底部播放器 */}
      <BottomPlayer />
    </div>
  );
};

export default Layout;