import arrowWhite from '@/assets/icons/arrow-white.svg'
import { Heading, TextBody } from '@/components/common/Text/TextFactory'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

interface RoleProps {
  title: string
  role: string
}

export const HomePage = () => {
  const navigate = useNavigate()

  return (
    <WrapperBody>
      <Wrapper>
        <Inner>
          <TitleBlock>
            <Heading.Large style={{ color: 'white' }}>역할을 선택하세요</Heading.Large>
            <TextBody.Large style={{ color: 'rgba(255,255,255,0.92)', marginTop: 8 }}>
              로그인할 사용자의 역할을 선택해 계속 진행합니다.
            </TextBody.Large>
          </TitleBlock>
          <RoleButton title="요양보호사" role="careworker" />
          <RoleButton title="보호자" role="guardian" />
          <RoleButton title="요양원" role="institution" />
          <RoleButton title="관리자" role="admin" />
        </Inner>
      </Wrapper>
    </WrapperBody>
  )
}

const RoleButton = ({ title, role }: RoleProps) => {
  const navigate = useNavigate()
  localStorage.clear()

  return (
    <RoleWrapper
      onClick={() => {
        localStorage.setItem('role', role)
        navigate(`/login`)
      }}
    >
      <Heading.Medium style={{ fontWeight: '700', color: 'white' }}>{title} 로그인</Heading.Medium>
      <img src={arrowWhite} alt="go" />
    </RoleWrapper>
  )
}

const WrapperBody = styled.div`
  margin: 0;
  padding: 0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eaf7ef; /* fallback while image loads */
`

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 24px;
  box-sizing: border-box;

  /* 사진 느낌 배경 + 그린 오버레이 */
  background-image: linear-gradient(120deg, rgba(34, 199, 120, 0.78), rgba(34, 184, 135, 0.78)),
    url('https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?q=80&w=1600&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
`

const Inner = styled.div`
  width: 100%;
  max-width: 720px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 18px;
`

const TitleBlock = styled.div`
  margin-bottom: 8px;
`

const RoleWrapper = styled.div`
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.35);
  color: #ffffff;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  height: 88px;
  border-radius: 18px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.18);
  cursor: pointer;
  transition:
    transform 0.15s ease,
    background 0.15s ease,
    box-shadow 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 14px 34px rgba(0, 0, 0, 0.22);
  }
  &:active {
    transform: translateY(0) scale(0.99);
  }
`
