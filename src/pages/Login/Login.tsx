import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InputField } from '@/components/common/InputField/InputField'
import styled from '@emotion/styled'
import { AuthProvider } from '@/provider/Auth/authApi'
import { Heading, TextBody } from '@/components/common/Text/TextFactory'

export const LoginPage = () => {
  const [userId, setId] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const role = localStorage.getItem('role')

  const login = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      await AuthProvider(role!, { userId, password })
      role === 'careworker' || role === 'guardian' ? navigate('/recipients') : navigate('/select')
    } catch (error) {
      console.error('Login failed:', error)
      alert('로그인에 실패하였습니다. 다시 시도해 주세요.')
    }
  }

  return (
    <Screen>
      <Overlay />
      <LoginCard onSubmit={login}>
        <TitleBlock>
          <Heading.Medium>EZ케어 로그인</Heading.Medium>
          <TextBody.Medium className="subtitle">
            역할에 맞는 계정으로 로그인해 주세요.
          </TextBody.Medium>
        </TitleBlock>

        <div>
          {role === 'careworker' || role === 'guardian' ? (
            <TextBody.Small className="hint">전화번호와 비밀번호를 입력해 주세요.</TextBody.Small>
          ) : (
            <TextBody.Small className="hint">아이디와 비밀번호를 입력해 주세요.</TextBody.Small>
          )}
        </div>

        <Fields>
          {role === 'careworker' || role === 'guardian' ? (
            <InputField
              placeholder="전화번호 ( '-' 제외)"
              id="userId"
              name="userId"
              value={userId}
              onChange={(e) => setId(e.target.value)}
              style={{ fontSize: '18px', height: '52px' }}
            />
          ) : (
            <InputField
              placeholder="아이디"
              id="userId"
              name="userId"
              value={userId}
              onChange={(e) => setId(e.target.value)}
              style={{ fontSize: '18px', height: '52px' }}
            />
          )}
          <InputField
            placeholder="비밀번호"
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ fontSize: '18px', height: '52px' }}
          />
        </Fields>

        <SubmitButton type="submit">로그인</SubmitButton>
      </LoginCard>
    </Screen>
  )
}

const Screen = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background: #eaf7ef;

  /* 사진 느낌 배경 */
  background-image: linear-gradient(120deg, rgba(34, 199, 120, 0.8), rgba(34, 184, 135, 0.8)),
    url('https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=1600&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
`

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(800px 300px at 10% 90%, rgba(255, 255, 255, 0.18), transparent),
    radial-gradient(600px 240px at 90% 85%, rgba(255, 255, 255, 0.18), transparent);
`

const LoginCard = styled.form`
  position: relative;
  width: 100%;
  max-width: 460px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.18);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 26px 22px 22px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  .subtitle {
    opacity: 0.8;
  }
`

const Fields = styled.div`
  display: grid;
  gap: 12px;
  margin-top: 8px;
`

const SubmitButton = styled.button`
  margin-top: 6px;
  height: 54px;
  border: 0;
  border-radius: 12px;
  background: linear-gradient(135deg, #34c759, #22b887);
  color: #fff;
  font-weight: 800;
  letter-spacing: -0.01em;
  cursor: pointer;
  box-shadow: 0 10px 24px rgba(34, 199, 120, 0.35);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    filter 0.15s ease;
  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.02);
  }
  &:active {
    transform: translateY(0) scale(0.99);
  }
`
