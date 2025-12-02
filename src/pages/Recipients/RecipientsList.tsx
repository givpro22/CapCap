import { useNavigate } from 'react-router-dom'
import newChart from '@/assets/icons/chart_write.svg'
import chartList from '@/assets/icons/chart_list.svg'
import styled from 'styled-components'
import { Calendar } from '@/api/hooks/user/chart/types'
import { getCalendarData } from '@/api/hooks/user/chart/useGetCalendar'
import { getDetailLogData } from '@/api/hooks/chart/useGetChart'

interface Props {
  recipientId: number
  picture: string
  name: string
  birthday: string
  width?: string
  height?: string
  borderRadius?: string
}

export const RecipientsList = ({
  recipientId,
  picture,
  name,
  birthday,
  width = '40px',
  height = '48px',
  borderRadius = '50%',
}: Props) => {
  const navigate = useNavigate()
  const currentRole = localStorage.getItem('role')
  const todayKST = new Date()
    .toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
    .replace(/\. /g, '-')
    .replace('.', '')

  const formatBirthDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-')
    return `${year.slice(2)}${month}${day}`
  }
  const role = localStorage.getItem('role')

  const handleNewChartClick = async () => {
    try {
      const response = await getCalendarData(recipientId, role!)
      const todayChart = response.find((chart: Calendar) => chart.chartDate === todayKST)

      if (todayChart) {
        const confirmUpdate = window.confirm(`해당 날짜의 일지가 존재합니다. 수정하시겠습니까?`)
        if (confirmUpdate) {
          const chartId = todayChart.chartId
          localStorage.setItem('chartId', chartId.toString())
          localStorage.removeItem('state')
          localStorage.setItem('state', 'put')
          const chartResponse = await getDetailLogData({ chartId: Number(chartId) })
          const chartData = chartResponse.response

          localStorage.setItem('chartData', JSON.stringify(chartData))
          navigate('/chart/choice/body')
        }
      } else {
        localStorage.removeItem('state')
        localStorage.removeItem('recipientId')
        localStorage.removeItem('recipientName')
        localStorage.removeItem('recipientBirthday')
        localStorage.setItem('state', 'post')
        localStorage.setItem('recipientId', recipientId.toString())
        localStorage.setItem('recipientName', name)
        localStorage.setItem('recipientBirthday', birthday)
        navigate('/chart')
      }
    } catch (error) {
      console.error('Error fetching chart data:', error)
    }
  }

  return (
    <Row
      onClick={
        currentRole === 'guardian'
          ? () => {
              localStorage.removeItem('recipientId')
              localStorage.removeItem('recipientName')
              localStorage.removeItem('recipientBirthday')
              localStorage.setItem('recipientId', recipientId.toString())
              localStorage.setItem('recipientName', name)
              localStorage.setItem('recipientBirthday', birthday)
              navigate('/calendar', { state: { name, birthday } })
            }
          : undefined
      }
    >
      <Left>
        <Avatar src={picture} style={{ height, width, borderRadius }} alt={`${name} 프로필`} />
        <NameArea>
          <Name>{name}</Name>
          <Birth>{formatBirthDate(birthday)}</Birth>
        </NameArea>
      </Left>

      {currentRole === 'careworker' ? (
        <Right onClick={(e) => e.stopPropagation()}>
          <IconStack>
            <IconButton aria-label="새 일지 작성" onClick={handleNewChartClick}>
              <img src={newChart} alt="new chart" />
            </IconButton>
            <ButtonLabel>차트작성</ButtonLabel>
          </IconStack>

          <IconStack>
            <IconButton
              aria-label="일지 목록 보기"
              onClick={() => {
                localStorage.removeItem('recipientId')
                localStorage.removeItem('recipientName')
                localStorage.removeItem('recipientBirthday')
                localStorage.setItem('recipientId', recipientId.toString())
                localStorage.setItem('recipientName', name)
                localStorage.setItem('recipientBirthday', birthday)
                navigate('/calendar', { state: { name, birthday } })
              }}
            >
              <img src={chartList} alt="chart list" />
            </IconButton>
            <ButtonLabel>요양일지</ButtonLabel>
          </IconStack>
        </Right>
      ) : null}
    </Row>
  )
}

const Row = styled.div`
  width: 100%;
  box-sizing: border-box;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  /* 사진 느낌: 글래스 카드 행 */
  background: rgba(255, 255, 255, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 16px;
  padding: 12px 14px;
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
  overflow-x: hidden;
`

const Left = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
`

const Avatar = styled.img`
  flex: 0 0 auto;
  object-fit: cover;
  background: #e6f3eb;
`

const NameArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 10px;
  min-width: 0;
`

const Name = styled.div`
  color: rgba(0, 0, 0, 0.85);
  font-size: 20px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Birth = styled.div`
  color: rgba(0, 0, 0, 0.55);
  font-size: 16px;
  font-weight: 600;
`

const Right = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`

const IconButton = styled.button`
  appearance: none;
  border: 0;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.6);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  transition:
    transform 0.12s ease,
    background 0.12s ease,
    box-shadow 0.12s ease;

  img {
    height: 22px;
  }

  &:hover {
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.5);
    box-shadow: 0 10px 22px rgba(0, 0, 0, 0.16);
  }
  &:active {
    transform: translateY(0) scale(0.98);
  }
`

const IconStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  text-align: center;
`

const ButtonLabel = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.7);
  line-height: 1;
`
