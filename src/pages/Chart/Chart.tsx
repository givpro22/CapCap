import { Heading, Paragraph, TextBody } from '@/components/common/Text/TextFactory'
import styled from 'styled-components'
import cameraIcon from '@/assets/icons/camera.svg'
import nextArrow from '@/assets/icons/next_arrow.svg'
import recording from '@/assets/icons/recording.svg'
import pencil from '@/assets/icons/pencil.svg'
import cameraLineIcon from '@/assets/icons/camera_line.svg'
import galleryLineIcon from '@/assets/icons/gallery_line.svg'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  icon: string
  title: string
  sub: string
  onClick: () => void
}

export const ChartPage = () => {
  const [showPopup, setShowPopup] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const navigate = useNavigate()
  localStorage.removeItem('chartType')

  const navigateToRecord = () => {
    localStorage.setItem('chartType', 'record')
    navigate('/chart/audioRecord/body')
  }

  const navigateToDIY = () => {
    localStorage.setItem('chartType', 'DIY')
    navigate('/chart/choice/body')
  }

  useEffect(() => {
    localStorage.removeItem('bodyManagement')
    localStorage.removeItem('physicalNote')
    localStorage.removeItem('cognitiveManagement')
    localStorage.removeItem('cognitiveNote')
    localStorage.removeItem('nursingManagement')
    localStorage.removeItem('healthNote')
    localStorage.removeItem('recoveryTraining')
    localStorage.removeItem('recoveryNote')
  })

  return (
    <Screen>
      <Overlay />
      <Card>
        <TitleBlock>
          <Subtitle>오늘 {localStorage.getItem('recipientName')}님의 상태는 어땠나요?</Subtitle>
          <Heading.Medium>간편하게 차트를 작성해 보아요!</Heading.Medium>
        </TitleBlock>

        <Blocks>
          <ChartBlock
            icon={cameraIcon}
            title="사진 촬영"
            sub="작성한 차트를 촬영하거나 업로드 해주세요."
            onClick={() => setShowPopup(true)}
          />

          <ChartBlock
            icon={recording}
            title="음성 인식"
            sub="작성할 내용을 녹음해주세요."
            onClick={navigateToRecord}
          />

          <ChartBlock
            icon={pencil}
            title="직접 입력"
            sub="작성할 내용을 직접 입력해주세요."
            onClick={navigateToDIY}
          />
        </Blocks>
      </Card>

      {showPopup && (
        <PopupOverlay onClick={() => setShowPopup(false)}>
          <PopupContent onClick={(e) => e.stopPropagation()} className="slide-up">
            <Handle />
            <SheetTitle>
              <Heading.Small>사진에서 가져오기</Heading.Small>
            </SheetTitle>
            <Options>
              <Option onClick={() => navigate('/camera')}>
                <OptionIcon src={cameraLineIcon} alt="camera" />
                <Paragraph.Large>사진 촬영</Paragraph.Large>
              </Option>
              <Option onClick={() => navigate('/ocr')}>
                <OptionIcon src={galleryLineIcon} alt="gallery" />
                <Paragraph.Large>갤러리에서 선택</Paragraph.Large>
                <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
              </Option>
            </Options>
          </PopupContent>
        </PopupOverlay>
      )}
    </Screen>
  )
}

const ChartBlock = ({ icon, title, sub, onClick }: Props) => {
  return (
    <Row onClick={onClick}>
      <Left>
        <IconCircle>
          <img src={icon} alt={title} />
        </IconCircle>
        <Info>
          <Heading.Small>{title}</Heading.Small>
          <SubText>{sub}</SubText>
        </Info>
      </Left>
      <Chevron src={nextArrow} alt="arrow" />
    </Row>
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
  overflow-x: hidden;

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
  max-width: 880px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 24px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.18);
  padding: 26px 22px 22px;
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 14px;
`

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const Subtitle = styled(TextBody.Large)`
  opacity: 0.8;
`

const Blocks = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
`

const Row = styled.div`
  width: 97%;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  background: rgba(255, 255, 255, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 16px;
  padding: 14px 16px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    background 0.15s ease;

  &:hover {
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.72);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.12);
  }
`

const Left = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
`

const IconCircle = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e9fbef, #d6f5e3);
  border: 1px solid #c8eed7;
  box-shadow:
    inset 0 0 0 2px rgba(255, 255, 255, 0.6),
    0 6px 16px rgba(0, 0, 0, 0.12);

  img {
    height: 26px;
  }
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
`

const SubText = styled(TextBody.Medium)`
  color: rgba(0, 0, 0, 0.65);
  line-height: 1.5;
`

const Chevron = styled.img`
  height: 20px;
  flex: 0 0 auto;
  opacity: 0.85;
`

/* Bottom Sheet (Popup) */
const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1000;
  backdrop-filter: blur(2px);
`

const PopupContent = styled.div`
  width: 100%;
  max-width: 420px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.6);
  padding: 18px 18px 26px;
  border-radius: 24px 24px 0 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transform: translateY(100%);
  transition: transform 0.3s ease-in-out;

  &.slide-up {
    transform: translateY(0);
  }
`

const Handle = styled.div`
  width: 44px;
  height: 5px;
  border-radius: 9999px;
  background: rgba(0, 0, 0, 0.12);
  margin: 4px auto 6px;
`

const SheetTitle = styled.div`
  text-align: center;
  margin-bottom: 4px;
`

const Options = styled.div`
  display: grid;
  gap: 8px;
`

const Option = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 10px;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }
`

const OptionIcon = styled.img`
  margin-right: 10px;
  height: 22px;
`
