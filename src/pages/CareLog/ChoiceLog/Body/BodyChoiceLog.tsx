import styled from 'styled-components'
import waterDrop from '@/assets/icons/water_drop.svg'
import shower from '@/assets/icons/shower.svg'
import meal from '@/assets/icons/meal.svg'
import mealAmount from '@/assets/icons/meal_amount.svg'
import movement from '@/assets/icons/movement.svg'
import bathroom from '@/assets/icons/toilet.svg'
import wheelchair from '@/assets/icons/wheelchair.svg'
import walking from '@/assets/icons/walking.svg'
import { ChoiceBox } from '@/components/features/MultipleChoice/ChoiceBox'
import { IoCalendarNumberOutline } from 'react-icons/io5'
import Steps from '@/components/common/Steps/Steps'
import { Heading, TextBody } from '@/components/common/Text/TextFactory'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getDetailLogData } from '@/api/hooks/chart/useGetChart'
import { Chart } from '@/api/hooks/user/chart/types'
import { Spinner } from 'basic-loading'

interface ListWrapperProps {
  isScrolled: boolean
}

export const BodyChoiceLogPage = () => {
  const navigate = useNavigate()
  const selectedDate = localStorage.getItem('selectedDate')
  const { chartId } = useParams<{ chartId: string }>()
  const [detailLog, setDetailLog] = useState<Chart | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)

  const onScroll = (event: any) => {
    const scrollTop = event.target.scrollTop
    setIsScrolled(scrollTop > 0)
  }

  useEffect(() => {
    if (chartId) {
      const fetchCareLogData = async () => {
        try {
          const response = await getDetailLogData({ chartId: Number(chartId) })
          if (response.success) {
            setDetailLog(response.response)
            localStorage.setItem('detailLog', JSON.stringify(response.response))
          }
        } catch (error) {
          console.error('Chart API 호출 중 오류 발생:', error)
        } finally {
          setIsLoading(false)
        }
      }
      fetchCareLogData()
    }
  }, [chartId])

  return (
    <Screen>
      <Overlay />
      <Card>
        <HeaderArea>
          <DateRow>
            <IoCalendarNumberOutline style={{ width: 22, height: 22, color: '#1fb873' }} />
            <DateText>{selectedDate}</DateText>
          </DateRow>
          <Steps currentStep={1} totalSteps={4} isLog={true} chartId={chartId} />
          <SectionTitle>
            <Heading.Medium>신체 활동 지원</Heading.Medium>
          </SectionTitle>
        </HeaderArea>

        <ContentScroll onScroll={onScroll} isScrolled={isScrolled}>
          {isLoading ? (
            <SpinnerWrap>
              <Spinner
                option={{ size: 70, thickness: 5, bgColor: '#EDF4FF', barColor: '#22C778' }}
              />
            </SpinnerWrap>
          ) : (
            <ChoiceGrid>
              <ChoiceBox
                icon={waterDrop}
                title="청결 관리"
                content={detailLog?.bodyManagement.wash ? 'O' : 'X'}
              />
              <ChoiceBox
                icon={shower}
                title="목욕"
                content={detailLog?.bodyManagement.bath ? 'O' : 'X'}
              />
              <ChoiceBox
                icon={movement}
                title="체위 변경"
                content={detailLog?.bodyManagement.positionChangeRequired ? 'O' : 'X'}
              />
              <ChoiceBox
                icon={wheelchair}
                title="이동 도움"
                content={detailLog?.bodyManagement.mobilityAssistance ? 'O' : 'X'}
              />
              <ChoiceBox
                icon={walking}
                title="산책 / 외출 동행"
                content={detailLog?.bodyManagement.hasWalked ? 'O' : 'X'}
              />
              <ChoiceBox
                icon={bathroom}
                title="화장실 이용 횟수"
                content={`${detailLog?.bodyManagement.physicalRestroom}회`}
              />
              <ChoiceBox
                icon={meal}
                title="식사 종류"
                content={`${detailLog?.bodyManagement.mealType}`}
              />
              <ChoiceBox
                icon={mealAmount}
                title="섭취량"
                content={`${detailLog?.bodyManagement.intakeAmount}`}
              />
            </ChoiceGrid>
          )}
        </ContentScroll>

        <ButtonRow>
          <PrimaryButton
            onClick={() => {
              navigate(`/careLog/significant/body/${chartId}`)
            }}
          >
            확인
          </PrimaryButton>
        </ButtonRow>
      </Card>
    </Screen>
  )
}

// ===== styled =====
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
  background-image: linear-gradient(120deg, rgba(34, 199, 120, 0.78), rgba(34, 184, 135, 0.78)),
    url('https://images.unsplash.com/photo-1487956382158-bb926046304a?q=80&w=1800&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
`

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(1000px 380px at 12% 92%, rgba(255, 255, 255, 0.18), transparent),
    radial-gradient(900px 320px at 88% 85%, rgba(255, 255, 255, 0.18), transparent);
`

const Card = styled.div`
  position: relative;
  width: 100%;
  max-width: 980px;
  min-height: 70vh;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 24px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.18);
  padding: 18px 18px 12px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 8px;
`

const HeaderArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 4px 6px 8px;
`

const DateRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 6px 0;
`

const DateText = styled(TextBody.Medium)`
  font-weight: 800;
  color: rgba(0, 0, 0, 0.75);
`

const SectionTitle = styled.div`
  padding: 8px 6px 0;
`

const ContentScroll = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isScrolled'].includes(prop),
})<ListWrapperProps>`
  width: 100%;
  height: calc(70vh - 160px);
  overflow-y: auto;
  padding: 0 6px 10px;
  box-sizing: border-box;
  box-shadow: ${({ isScrolled }) =>
    isScrolled ? 'inset 0 12px 20px -12px rgba(0,0,0,0.25)' : 'none'};
  transition: box-shadow 0.3s ease;
`

const SpinnerWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ChoiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px 14px;
  width: 100%;
  justify-items: center;
  padding: 12px 6px 20px;
  box-sizing: border-box;

  @media (max-width: 300px) {
    grid-template-columns: 1fr;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const ButtonRow = styled.div`
  width: 100%;
  padding: 0 10px 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
`

const PrimaryButton = styled.button`
  width: 100%;
  max-width: 520px;
  height: 58px;
  border: 0;
  border-radius: 14px;
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
