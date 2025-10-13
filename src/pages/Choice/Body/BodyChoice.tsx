import styled from 'styled-components'
import waterDrop from '@/assets/icons/water_drop.svg'
import shower from '@/assets/icons/shower.svg'
import meal from '@/assets/icons/meal.svg'
import mealAmount from '@/assets/icons/meal_amount.svg'
import movement from '@/assets/icons/movement.svg'
import bathroom from '@/assets/icons/toilet.svg'
import wheelchair from '@/assets/icons/wheelchair.svg'
import walking from '@/assets/icons/walking.svg'

import { useEffect, useState } from 'react'

import { Heading } from '@/components/common/Text/TextFactory'
import Steps from '@/components/common/Steps/Steps'
import { CheckBox } from '@/components/features/MultipleChoice/CheckBox'
import { MultipleBox } from '@/components/features/MultipleChoice/MultipleBox'
import { TimesBox } from '@/components/features/MultipleChoice/TimesBox'
import { useNavigate } from 'react-router-dom'
import { Chart } from '@/api/hooks/user/chart/types'

interface ListWrapperProps {
  isScrolled: boolean
}

export const BodyChoicePage = () => {
  const navigate = useNavigate()
  const chartType = localStorage.getItem('chartType')
  const [selectedOptions, setSelectedOptions] = useState<Chart['bodyManagement']>({
    wash: false,
    bath: false,
    mealType: '',
    intakeAmount: '',
    physicalRestroom: '',
    hasWalked: false,
    positionChangeRequired: false,
    mobilityAssistance: false,
    physicalNote: '',
  })
  const [isScrolled, setIsScrolled] = useState(false)
  const scroll = (event: any) => {
    const scrollTop = event.target.scrollTop
    setIsScrolled(scrollTop > 0)
  }
  useEffect(() => {
    const savedChartData = localStorage.getItem('chartData')
    if (savedChartData) {
      const parsedData = JSON.parse(savedChartData)

      setSelectedOptions((prev) => ({
        ...prev,
        wash: parsedData.bodyManagement?.wash || false,
        bath: parsedData.bodyManagement?.bath || false,
        mealType: parsedData.bodyManagement?.mealType || '',
        intakeAmount: parsedData.bodyManagement?.intakeAmount || '',
        physicalRestroom: parsedData.bodyManagement?.physicalRestroom || '',
        hasWalked: parsedData.bodyManagement?.hasWalked || false,
        positionChangeRequired: parsedData.bodyManagement?.positionChangeRequired || false,
        mobilityAssistance: parsedData.bodyManagement?.mobilityAssistance || false,
        physicalNote: parsedData.bodyManagement?.physicalNote || '',
      }))
    }
  }, [])

  const [errors, setErrors] = useState({
    mealType: '',
    intakeAmount: '',
    physicalRestroom: '',
  })

  const selectOption = (key: keyof Chart['bodyManagement'], value: any) => {
    const existingChartData = JSON.parse(localStorage.getItem('chartData') || '{}')

    const updatedBodyManagement = {
      ...existingChartData.bodyManagement,
      [key]: value,
    }

    const updatedChartData = {
      ...existingChartData,
      bodyManagement: updatedBodyManagement,
    }
    localStorage.setItem('chartData', JSON.stringify(updatedChartData))

    setSelectedOptions(updatedBodyManagement)
  }
  const validateInputs = () => {
    const { mealType, intakeAmount, physicalRestroom } = selectedOptions
    const newErrors: typeof errors = {
      mealType: '',
      intakeAmount: '',
      physicalRestroom: '',
    }

    if (!mealType) newErrors.mealType = '식사 종류를 선택해주세요'
    if (!intakeAmount) newErrors.intakeAmount = '섭취량을 선택해주세요'
    if (!physicalRestroom) newErrors.physicalRestroom = '화장실 이용 횟수를 입력해주세요'

    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error)
  }

  const confirm = () => {
    if (validateInputs()) {
      if (chartType === 'DIY') {
        navigate('/chart/significant/body')
      } else if (chartType === 'record') {
        navigate('/chart/audioRecord/body')
      }
    }
  }

  return (
    <Screen>
      <Overlay />
      <Card>
        <HeaderArea>
          <Steps currentStep={1} totalSteps={4} />
          <Heading.Medium style={{ marginTop: '20px', width: '100%' }}>
            신체 활동 지원
          </Heading.Medium>
        </HeaderArea>

        <ContentScroll onScroll={scroll} isScrolled={isScrolled}>
          <ChoiceGrid>
            <GridItem>
              <CheckBox
                icon={waterDrop}
                title="청결 관리"
                checked={selectedOptions.wash}
                onChange={() => selectOption('wash', !selectedOptions.wash)}
              />
            </GridItem>

            <GridItem>
              <CheckBox
                icon={shower}
                title="목욕"
                checked={selectedOptions.bath}
                onChange={() => selectOption('bath', !selectedOptions.bath)}
              />
            </GridItem>

            <GridItem>
              <CheckBox
                icon={movement}
                title="체위 변경"
                checked={selectedOptions.positionChangeRequired}
                onChange={() =>
                  selectOption('positionChangeRequired', !selectedOptions.positionChangeRequired)
                }
              />
            </GridItem>

            <GridItem>
              <CheckBox
                icon={wheelchair}
                title="이동 도움"
                checked={selectedOptions.mobilityAssistance}
                onChange={() =>
                  selectOption('mobilityAssistance', !selectedOptions.mobilityAssistance)
                }
              />
            </GridItem>

            <GridItem>
              <CheckBox
                icon={walking}
                title="산책 / 외출 동행"
                checked={selectedOptions.hasWalked}
                onChange={() => selectOption('hasWalked', !selectedOptions.hasWalked)}
              />
            </GridItem>

            <GridItem>
              <TimesBox
                icon={bathroom}
                title="화장실 이용 횟수"
                count={selectedOptions.physicalRestroom}
                onCountChange={(count) => selectOption('physicalRestroom', count.toString())}
              />
              {errors.physicalRestroom && <ErrorMessage>{errors.physicalRestroom}</ErrorMessage>}
            </GridItem>

            <GridItem>
              <MultipleBox
                icon={meal}
                title="식사 종류"
                options={['일반식', '죽', '유동식']}
                selectedOption={selectedOptions.mealType}
                onSelectOption={(option) => selectOption('mealType', option)}
              />
              {errors.mealType && <ErrorMessage>{errors.mealType}</ErrorMessage>}
            </GridItem>

            <GridItem>
              <MultipleBox
                icon={mealAmount}
                title="섭취량"
                options={['1 (전부)', '1/2 이상', '1/2 미만']}
                selectedOption={selectedOptions.intakeAmount}
                onSelectOption={(option) => selectOption('intakeAmount', option)}
              />
              {errors.intakeAmount && <ErrorMessage>{errors.intakeAmount}</ErrorMessage>}
            </GridItem>
          </ChoiceGrid>

          <ButtonRow>
            <PrimaryButton onClick={confirm}>확인</PrimaryButton>
          </ButtonRow>
        </ContentScroll>
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
  max-width: 1160px; /* ↑ 더 넓게 */
  min-height: 70vh;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 24px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.18);
  padding: 24px 22px 16px; /* ↑ 패딩 확대 */
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 12px; /* ↑ 간격 확대 */
`

const HeaderArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 4px 6px 8px;
`

const ContentScroll = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isScrolled'].includes(prop),
})<ListWrapperProps>`
  width: 100%;
  height: calc(70vh - 120px);
  overflow-y: auto;
  padding: 0 8px 12px; /* ↑ 내부 여백 약간 확대 */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  box-shadow: ${({ isScrolled }) =>
    isScrolled ? 'inset 0 12px 20px -12px rgba(0,0,0,0.25)' : 'none'};
  transition: box-shadow 0.3s ease;
`

const ChoiceGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(320px, 1fr);
  grid-auto-rows: 1fr;
  gap: 24px;
  width: 100%;
  justify-items: stretch;
  align-items: stretch;
  padding: 16px 8px 24px;
  box-sizing: border-box;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(420px, 1fr));
  }
`

const GridItem = styled.div`
  width: 100%;
  min-height: 180px; /* 모든 카드 동일 최소 높이 */
  display: flex;
  flex-direction: column;

  /* 내부 카드가 고정 너비를 갖고 있어도 셀을 가득 채우도록 강제 */
  & > * {
    width: 100% !important;
    height: 100%;
  }

  /* 에러 메시지가 있을 때 아래에 붙도록 */
  & > ${'' /* first child is the card */} :first-child {
    flex: 1 1 auto;
  }
`

const ButtonRow = styled.div`
  width: 100%;
  padding: 0 10px 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;
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

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
