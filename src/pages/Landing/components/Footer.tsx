import Container from '@/components/common/Container/Container'
import { MAX_CONTENT_WIDTH } from '@/styles/sizes/sizes'
import { TextBody } from '@/components/common/Text/TextFactory'
import styled from 'styled-components'
import { breakpoints } from '@/styles/breakpoints/breakpoints'

function Footer() {
  return (
    <Container size="full-width" justify="center">
      <FooterWrapper>
        <TextBody.Medium style={{ fontWeight: 700 }}>
          Team Vibe(팀 바이브) · 산학협력 캡스톤 진행 중
        </TextBody.Medium>
        <CopyrightWrapper>
          <div>© 2025 Team Vibe — 산학협력 캡스톤 진행 중</div>
          <div>All Rights Reserved.</div>
        </CopyrightWrapper>
      </FooterWrapper>
    </Container>
  )
}

const FooterWrapper = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding: 0 40px;
  max-width: ${MAX_CONTENT_WIDTH};
  gap: 14px;

  @media (min-width: ${breakpoints.sm}) {
    gap: 20px;
    height: 200px;
  }
`

const CopyrightWrapper = styled.div`
  font-weight: 600;
  display: flex;
  flex-direction: column;
  gap: 5px;
  @media (min-width: ${breakpoints.xs}) {
    flex-direction: row;
  }
`

export default Footer
