import styled from 'styled-components'
import { RecipientsList } from './RecipientsList'
import image from '@/assets/images/profile.svg'
import { Heading, TextBody } from '@/components/common/Text/TextFactory'
import { useEffect, useState } from 'react'
import { Recipient } from '@/api/hooks/admin/recipient/types'
import { getRecipients } from '@/api/hooks/user/recipient/recipientApi'

interface ListWrapperProps {
  isScrolled: boolean
}

export const RecipientsPage = () => {
  const [recipients, setRecipients] = useState<Recipient[]>([])
  const [isScrolled, setIsScrolled] = useState(false)
  const role = localStorage.getItem('role')
  localStorage.setItem('chartType', 'DIY')

  useEffect(() => {
    localStorage.removeItem('chartData')
    const fetchRecipients = async () => {
      try {
        const data = await getRecipients(role!)
        setRecipients(data)
      } catch (error) {
        console.error('Failed to fetch recipients:', error)
      }
    }
    fetchRecipients()
  }, [role])

  const onScroll = (event: any) => {
    const scrollTop = event.target.scrollTop
    setIsScrolled(scrollTop > 0)
  }

  return (
    <Screen>
      <Overlay />
      <Card>
        <HeaderArea>
          <Heading.Medium>돌봄대상자를 선택하세요</Heading.Medium>
          <TextBody.Medium className="sub">EZ케어 요양보호사</TextBody.Medium>
        </HeaderArea>

        <ListScroll onScroll={onScroll} isScrolled={isScrolled}>
          {recipients.map((recipient) => (
            <RecipientsList
              key={recipient.id}
              recipientId={recipient.id}
              picture={image}
              name={recipient.name}
              birthday={recipient.birth}
            />
          ))}
        </ListScroll>
      </Card>
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
  width: 90%;
  max-width: 1200px;
  min-height: 70vh;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 24px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.18);
  padding: 22px 20px;
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 12px;
`

const HeaderArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  .sub {
    opacity: 0.75;
  }
`

const ListScroll = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isScrolled'].includes(prop),
})<ListWrapperProps>`
  width: 100%;
  height: calc(70vh - 60px);
  margin-top: 8px;
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  flex-direction: column;
  box-sizing: border-box;
  overflow-y: auto;
  gap: 10px;
  padding: 6px;

  /* 상단 스크롤 그림자 */
  box-shadow: ${({ isScrolled }) =>
    isScrolled ? 'inset 0 12px 20px -12px rgba(0,0,0,0.25)' : 'none'};
  transition: box-shadow 0.3s ease;
`
