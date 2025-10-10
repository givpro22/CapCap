import styled from '@emotion/styled'
import { Heading, TextBody } from '@/components/common/Text/TextFactory'
import { breakpoints } from '@/styles/breakpoints/breakpoints'
import { MAX_CONTENT_WIDTH } from '@/styles/sizes/sizes'
import useIntersectionSlideEffect from '@/hooks/useIntersectionSlideEffect'
import { useRef } from 'react'

interface FeatureSectionProps {
  id?: string
}

const FeatureSection = ({ id }: FeatureSectionProps) => {
  const spyRef = useRef<HTMLDivElement>(null)
  const g1 = useRef<HTMLDivElement>(null)
  const g2 = useRef<HTMLDivElement>(null)
  const g3 = useRef<HTMLDivElement>(null)
  const g4 = useRef<HTMLDivElement>(null)

  useIntersectionSlideEffect({ spyRef, targetRef: g1, direction: 'left' })
  useIntersectionSlideEffect({ spyRef, targetRef: g2, direction: 'bottom', delay: 100 })
  useIntersectionSlideEffect({ spyRef, targetRef: g3, direction: 'top', delay: 200 })
  useIntersectionSlideEffect({ spyRef, targetRef: g4, direction: 'right', delay: 300 })

  return (
    <section id={id}>
      <Strip>
        <SectionInner>
          <HeaderBlock>
            <Heading.Medium>주요 기능</Heading.Medium>
            <TextBody.Large className="subtitle">
              꼭 필요한 기능만 담아 더 가볍고, 더 빠르게.
            </TextBody.Large>
          </HeaderBlock>
          <div ref={spyRef} />
          <FeatureGrid>
            <FeatureCard ref={g1} style={{ opacity: 0 }}>
              <Icon>⌚️</Icon>
              <Heading.Small>실시간 모니터링</Heading.Small>
              <TextBody.Medium>
                필요한 항목을 실시간으로 추적하고, 이상 징후를 빠르게 포착합니다.
              </TextBody.Medium>
            </FeatureCard>
            <FeatureCard ref={g2} style={{ opacity: 0 }}>
              <Icon>👩‍⚕️</Icon>
              <Heading.Small>전문가 상담 예약</Heading.Small>
              <TextBody.Medium>
                원하는 시간에 간편하게 예약하고, 화상/모바일 상담으로 이어집니다.
              </TextBody.Medium>
            </FeatureCard>
            <FeatureCard ref={g3} style={{ opacity: 0 }}>
              <Icon>⏰</Icon>
              <Heading.Small>맞춤 알림</Heading.Small>
              <TextBody.Medium>
                기록 시점·복용 시간 등 필요한 순간에 꼭 맞는 푸시 알림을 받습니다.
              </TextBody.Medium>
            </FeatureCard>
            <FeatureCard ref={g4} style={{ opacity: 0 }}>
              <Icon>🔒</Icon>
              <Heading.Small>보안 & 백업</Heading.Small>
              <TextBody.Medium>
                민감한 건강 데이터는 안전하게 암호화되고 자동 백업됩니다.
              </TextBody.Medium>
            </FeatureCard>
          </FeatureGrid>
        </SectionInner>
      </Strip>
    </section>
  )
}

const Strip = styled.div`
  background: linear-gradient(180deg, #f4fbf6, #e9fbef);
  padding: 90px 24px;
`

/* 중앙 정렬 고정: 콘텐츠 폭 제한 + 가운데 정렬 */
const SectionInner = styled.div`
  width: 100%;
  max-width: ${MAX_CONTENT_WIDTH};
  margin: 0 auto;
`

const HeaderBlock = styled.div`
  text-align: center;
  .subtitle {
    margin-top: 8px;
    opacity: 0.85;
  }
`

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-top: 28px;

  @media (min-width: ${breakpoints.md}) {
    grid-template-columns: repeat(4, 1fr);
    gap: 18px;
  }
`

const FeatureCard = styled.div`
  background: white;
  border: 1px solid #dff3e7;
  border-radius: 16px;
  padding: 18px;
  min-height: 160px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Icon = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #34c759;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: #fff;
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.6);
  user-select: none;
`

export default FeatureSection
