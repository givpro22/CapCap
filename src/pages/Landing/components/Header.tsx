import { css } from '@emotion/react'
import useSmoothScroll from '@/hooks/useSmoothScroll'
import Container from '@/components/common/Container/Container'
import { TextBody } from '@/components/common/Text/TextFactory'
import { breakpoints } from '@/styles/breakpoints/breakpoints'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate()

  // 고정 색상 헤더: 스크롤 여부와 관계없이 동일한 그린 배경
  const baseStyle = css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    /* 색상 변화 방지를 위해 투명도/블러 제거, 불투명 그린 그라데이션 적용 */
    background: linear-gradient(135deg, #5fd38b 0%, #34c759 60%, #22b887 100%);
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    transition: transform 0.2s ease-in; /* 위치만 부드럽게, 색상 변화 없음 */
    z-index: 1000;
  `

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const targetPosition = section.getBoundingClientRect().top + window.scrollY
      useSmoothScroll(targetPosition)
    }
  }

  return (
    <Container size="full-width" justify="center" style={baseStyle}>
      <HeaderContainer>
        <Brand onClick={() => window.scroll({ top: 0, behavior: 'smooth' })}>
          <BrandDot />
          <BrandText>EZ케어</BrandText>
        </Brand>

        <Nav>
          <NavLink
            as="button"
            onClick={() => scrollToSection('main-section')}
            aria-label="소개 섹션으로 이동"
          >
            소개
          </NavLink>
          <NavLink
            as="button"
            onClick={() => scrollToSection('feature-section')}
            aria-label="기능 섹션으로 이동"
          >
            기능
          </NavLink>
          <CtaButton onClick={() => navigate('/role')}>서비스 시작</CtaButton>
        </Nav>
      </HeaderContainer>
    </Container>
  )
}

const HeaderContainer = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  padding: 0 5%;
  box-sizing: border-box;

  @media (min-width: ${breakpoints.xs}) {
    height: 80px;
  }
`

const Brand = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
`

const BrandDot = styled.span`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: linear-gradient(135deg, #5fd38b 0%, #34c759 70%);
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.55), 0 4px 12px rgba(0, 0, 0, 0.15);
`

const BrandText = styled.span`
  color: #ffffff;
  font-weight: 800;
  letter-spacing: -0.02em;
  font-size: 18px;
  @media (min-width: ${breakpoints.xs}) {
    font-size: 20px;
  }
`

const Nav = styled.nav`
  display: inline-flex;
  align-items: center;
  gap: 14px;
  @media (min-width: ${breakpoints.sm}) {
    gap: 28px;
  }
`

const NavLink = styled(TextBody.Medium)`
  color: rgba(255, 255, 255, 0.92);
  font-weight: 700;
  cursor: pointer;
  border: none;
  background: transparent;
  padding: 6px 2px;
  transition: all 0.15s ease-in-out;
  &:hover {
    color: #ffffff;
    transform: translateY(-1px);
  }
  &:focus-visible {
    outline: 2px dashed rgba(255, 255, 255, 0.7);
    outline-offset: 3px;
  }
`

const CtaButton = styled.button`
  height: 38px;
  padding: 0 14px;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.45);
  background: rgba(255, 255, 255, 0.16);
  color: #ffffff;
  font-weight: 800;
  letter-spacing: -0.01em;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  backdrop-filter: blur(4px);

  &:hover {
    background: rgba(255, 255, 255, 0.24);
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0px) scale(0.99);
  }
`

export default Header
