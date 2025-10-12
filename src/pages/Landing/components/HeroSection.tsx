import { ReactNode, useRef, useState } from 'react'
import Container from '@/components/common/Container/Container'
import { Heading, TextBody } from '@/components/common/Text/TextFactory'
import styled from 'styled-components'
import { breakpoints } from '@/styles/breakpoints/breakpoints'
import useIntersectionSlideEffect from '@/hooks/useIntersectionSlideEffect'
import { useNavigate } from 'react-router-dom'

function HeroSection({ id }: { id?: string }) {
  const navigate = useNavigate()

  // intersection targets
  const spyRef = useRef<HTMLDivElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)
  const orbitRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  const [isModalOpen, setModalOpen] = useState(false)

  useIntersectionSlideEffect({ spyRef, targetRef: leftColRef, direction: 'left' })
  useIntersectionSlideEffect({ spyRef, targetRef: orbitRef, direction: 'right', delay: 150 })
  useIntersectionSlideEffect({ spyRef, targetRef: ctaRef, direction: 'bottom', delay: 300 })

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  return (
    <section id={id}>
      <HeroContainer>
        <Container size="full-width" maxWidth="100%" direction="column" align="center">
          <div ref={spyRef} />
          <HeroContent>
            {/* LEFT: copy + CTAs */}
            <LeftCol ref={leftColRef}>
              <Heading.XXLarge
                css={{
                  color: 'white',
                  lineHeight: '1.15',
                  letterSpacing: '-0.02em',
                }}
              >
                건강관리,
                <br />
                이제 쉽고 간편하게 ✨
              </Heading.XXLarge>

              <Subcopy>
                EZ케어(돌봄다리)와 함께 당신의 건강을 스마트하게 관리해보세요.
                <br />
                전문의와의 상담부터 기록까지 한 번에!
              </Subcopy>

              <CTAGroup ref={ctaRef}>
                <CTAButtonPrimary onClick={() => navigate('/role')}>
                  <span className="label">서비스 시작하기</span>
                  <span className="icon">↗︎</span>
                </CTAButtonPrimary>

                <CTAButtonSecondary onClick={openModal}>
                  <span className="label">전문의 상담 신청</span>
                </CTAButtonSecondary>
              </CTAGroup>
            </LeftCol>

            {/* RIGHT: orbit illustration without images */}
            <RightCol ref={orbitRef}>
              <Orbit>
                <CenterEmoji>🩺</CenterEmoji>
                <FloatingBadge style={{ top: '-24px', left: '-14px' }}>
                  <Em>👨‍⚕️</Em>
                  <span>전문의 상담</span>
                </FloatingBadge>
                <FloatingBadge style={{ bottom: '18%', right: '-18px' }}>
                  <Em>📊</Em>
                  <span>건강 리포트</span>
                </FloatingBadge>
                <FloatingBadge style={{ top: '18%', right: '-26px' }}>
                  <Em>🫀</Em>
                  <span>건강 모니터링</span>
                </FloatingBadge>
                <FloatingBadge style={{ bottom: '-12px', left: '10%' }}>
                  <Em>📱</Em>
                  <span>모바일 진료</span>
                </FloatingBadge>
              </Orbit>
            </RightCol>
          </HeroContent>

          {isModalOpen && (
            <Modal onClose={closeModal}>
              <Heading.Medium>Contact us !</Heading.Medium>
              <TextBody.Large>Team Vibe로 문의 주세요~~</TextBody.Large>
            </Modal>
          )}
        </Container>
      </HeroContainer>
    </section>
  )
}

// ===== styled =====
const HeroContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(120deg, #5fd38b 0%, #34c759 38%, #22b887 70%);
  position: relative;
  overflow: hidden;

  /* decorative gradient blob */
  &:before {
    content: '';
    position: absolute;
    right: -120px;
    top: -120px;
    width: 420px;
    height: 420px;
    background: radial-gradient(closest-side, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0));
    filter: blur(8px);
    border-radius: 50%;
  }
`

const HeroContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  align-items: center;
  width: 100%;
  max-width: 1160px;
  padding: 80px 24px;

  @media (min-width: ${breakpoints.md}) {
    grid-template-columns: 1.15fr 1fr;
    gap: 24px;
  }
`

const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 22px;
  opacity: 0; /* revealed by intersection hook */
`

const Subcopy = styled.p`
  color: rgba(255, 255, 255, 0.92);
  margin: 12px 0 0 0;
  line-height: 1.7;
  font-size: 18px;
  font-weight: 600;
`

const CTAGroup = styled.div`
  display: flex;
  flex-direction: column;
`

const CTAButtonBase = styled.button`
  appearance: none;
  border: 0;
  border-radius: 9999px;
  width: 320px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 22px;
  font-weight: 800;
  letter-spacing: -0.01em;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    background-color 0.15s ease;
  color: #ffffff;
`

const CTAButtonPrimary = styled(CTAButtonBase)`
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.45);
  justify-content: center;

  box-shadow:
    0 6px 16px rgba(0, 0, 0, 0.12),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  .label {
    font-size: 18px;
  }
  .icon {
    font-size: 20px;
    opacity: 0.95;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.18);
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0) scale(0.99);
  }
`

const CTAButtonSecondary = styled(CTAButtonBase)`
  margin-top: 14px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.35);
  justify-content: center;
  .label {
    font-size: 18px;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.14);
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0) scale(0.99);
  }
`

const RightCol = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0; /* revealed by intersection hook */
`

const Orbit = styled.div`
  position: relative;
  width: 360px;
  height: 360px;
  border-radius: 50%;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(255, 255, 255, 0.18),
    rgba(255, 255, 255, 0.06)
  );
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.18),
    inset 0 0 0 1px rgba(255, 255, 255, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;

  /* concentric rings */
  &:after {
    content: '';
    position: absolute;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    border: 2px dashed rgba(255, 255, 255, 0.35);
  }

  @media (min-width: ${breakpoints.md}) {
    width: 460px;
    height: 460px;
  }
`

const CenterEmoji = styled.div`
  font-size: 64px;
  user-select: none;
`

const FloatingBadge = styled.div`
  position: absolute;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: white;
  color: #111;
  border-radius: 14px;
  padding: 10px 14px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
  font-weight: 700;
  white-space: nowrap;
`

const Em = styled.span`
  font-size: 20px;
  line-height: 1;
`

interface ModalProps {
  onClose: () => void
  children: ReactNode
}

function Modal({ onClose, children }: ModalProps) {
  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>{children}</ModalContainer>
    </Overlay>
  )
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

const ModalContainer = styled.div`
  background: white;
  height: 20%;
  width: 80%;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  gap: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export default HeroSection
