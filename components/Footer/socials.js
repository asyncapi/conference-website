import React from 'react';
import styled from 'styled-components';

const Button = () => {
  return (
    <StyledWrapper>
      <ul className="wrapper">
        <li className="icon linkedin" onClick={() => window.location.href = 'https://www.linkedin.com/company/asyncapi/posts/?feedView=all'}>
          <span className="tooltip">LinkedIn</span>
          <svg viewBox="0 0 448 512" height="1.2em" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M100.28 448H7.4V148.9h92.88zm-46.44-341.5a53.27 53.27 0 1 1 53.26-53.27 53.27 53.27 0 0 1-53.26 53.27zM447.8 448h-92.63V302.4c0-34.7-.7-79.3-48.3-79.3s-55.7 37.8-55.7 76.9V448h-92.63V148.9h88.9v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
          </svg>
        </li>
        <li className="icon github" onClick={() => window.location.href = 'https://github.com/asyncapi'}>
          <span className="tooltip">GitHub</span>
          <svg xmlns="http://www.w3.org/2000/svg" height="1.8em" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.58.82-2.14-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.14 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </li>
        <li className="icon twitter" onClick={() => window.location.href = 'https://x.com/AsyncAPISpec'}>
  <span className="tooltip">Twitter</span>
  <svg xmlns="http://www.w3.org/2000/svg" height="1.8em" fill="currentColor" viewBox="0 0 24 24">
    <path d="M3 3h18v18H3V3zm10.4 8.2l4.3-6.2h-1.4l-3.6 5.2-3-5.2H5.7l4.2 7.1-4.6 6.7h1.4l3.9-5.6 3.2 5.6h3.2l-4.6-7.6z"/>
  </svg>
</li>

        <li className="icon youtube" onClick={() => window.location.href = 'https://www.youtube.com/asyncapi'}>
    <span className="tooltip">YouTube</span>
    <svg xmlns="http://www.w3.org/2000/svg" height="1.8em" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a2.999 2.999 0 0 0-2.118-2.118C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.568a2.999 2.999 0 0 0-2.118 2.118C0 8.07 0 12 0 12s0 3.93.502 5.814a2.999 2.999 0 0 0 2.118 2.118C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.568a2.999 2.999 0 0 0 2.118-2.118C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
    </svg>
  </li>
      </ul>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .wrapper {
    display: inline-flex;
    list-style: none;
    height: 120px;
    width: 100%;
    padding-top: 40px;
    font-family: "Poppins", sans-serif;
    justify-content: center;
  }

  .wrapper .icon {
    position: relative;
    background: #fff;
    border-radius: 50%;
    margin: 10px;
    width: 45px;
    height: 45px;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .wrapper .tooltip {
    position: absolute;
    top: 0;
    font-size: 14px;
    background: #fff;
    color: #fff;
    padding: 5px 8px;
    border-radius: 5px;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .wrapper .icon:hover .tooltip {
    top: -45px;
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }

  .wrapper .linkedin:hover,
  .wrapper .linkedin:hover .tooltip,
  .wrapper .linkedin:hover .tooltip::before {
    background: #0077b5;
    color: #fff;
  }

  .wrapper .github:hover,
  .wrapper .github:hover .tooltip,
  .wrapper .github:hover .tooltip::before {
    background: #333;
    color: #fff;
  }

  .wrapper .twitter:hover,
  .wrapper .twitter:hover .tooltip,
  .wrapper .twitter:hover .tooltip::before {
    background: #333;
    color: #fff;
  }
  
  .wrapper .youtube:hover,
  .wrapper .youtube:hover .tooltip,
  .wrapper .youtube:hover .tooltip::before {
    background: #ff0000;
    color: #fff;
  }`;

export default Button;