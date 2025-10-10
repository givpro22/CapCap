import styled from '@emotion/styled'
import { useRef } from 'react'
import { Heading, TextBody } from '@/components/common/Text/TextFactory'
import { breakpoints } from '@/styles/breakpoints/breakpoints'
import { MAX_CONTENT_WIDTH } from '@/styles/sizes/sizes'
import useIntersectionSlideEffect from '@/hooks/useIntersectionSlideEffect'

interface MainSectionProps {
  id?: string
}

const MainSection = ({ id }: MainSectionProps) => {
  const spyRef = useRef<HTMLDivElement>(null)
  const c1 = useRef<HTMLDivElement>(null)
  const c2 = useRef<HTMLDivElement>(null)
  const c3 = useRef<HTMLDivElement>(null)

  useIntersectionSlideEffect({ spyRef, targetRef: c1, direction: 'left' })
  useIntersectionSlideEffect({ spyRef, targetRef: c2, direction: 'bottom', delay: 150 })
  useIntersectionSlideEffect({ spyRef, targetRef: c3, direction: 'right', delay: 300 })

  return (
    <section id={id}>
      <Wrapper>
        <SectionInner>
          <Heading.Large style={{ textAlign: 'center' }}>왜 EZ케어인가요?</Heading.Large>
          <TextBody.Large style={{ opacity: 0.8, textAlign: 'center', marginTop: 10 }}>
            종이 차트의 불편함 없이, 누구나 쉽게 건강을 기록하고 공유할 수 있도록 디자인했어요.
          </TextBody.Large>
          <div ref={spyRef} />
          <Grid>
            <Card ref={c1} style={{ opacity: 0 }}>
              <Badge>🧾</Badge>
              <Heading.Small>간편 기록</Heading.Small>
              <TextBody.Medium>
                손으로 적던 내용을 간단한 양식으로 빠르게 입력하세요. 자동 저장과 히스토리로 계속
                이어 작성할 수 있어요.
              </TextBody.Medium>
            </Card>
            <Card ref={c2} style={{ opacity: 0 }}>
              <Badge>🎙️</Badge>
              <Heading.Small>음성 입력</Heading.Small>
              <TextBody.Medium>
                말하듯 기록하면 텍스트로 변환됩니다. 손이 바쁠 때도 놓치지 않고 기록해요.
              </TextBody.Medium>
            </Card>
            <Card ref={c3} style={{ opacity: 0 }}>
              <Badge>📈</Badge>
              <Heading.Small>요약·리포트</Heading.Small>
              <TextBody.Medium>
                일지를 자동 요약해 보호자와 한눈에 공유할 수 있어요. 주차별/월별 리포트도 제공해요.
              </TextBody.Medium>
            </Card>
          </Grid>
        </SectionInner>
      </Wrapper>
    </section>
  )
}

const Wrapper = styled.div`
  padding: 110px 35px 90px;
  background: #f4fbf6; /* very light green */
`

/* 중앙 정렬 고정: 콘텐츠 폭 제한 + 가운데 정렬 */
const SectionInner = styled.div`
  width: 100%;
  max-width: ${MAX_CONTENT_WIDTH};
  margin: 0 auto;
`

const Grid = styled.div`
  margin-top: 36px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;
  @media (min-width: ${breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
    gap: 22px;
  }
`

const Card = styled.div`
  background: linear-gradient(180deg, #e9fbef, #d6f5e3);
  border: 1px solid #c8eed7;
  border-radius: 20px;
  padding: 22px;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
`

const Badge = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #34c759;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.6);
  user-select: none;
`

export default MainSection
