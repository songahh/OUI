import Canvas from './components/Canvas';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Diary = () => {
    return (
        <Container>
            <Canvas />
        </Container>
    );
};

export default Diary;