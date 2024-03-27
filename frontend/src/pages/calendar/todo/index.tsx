import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { LeftIcon, RightIcon } from 'src/components'
import { useMutation, useQuery } from 'react-query'
import saveTodo from 'src/asset/images/saveTodo.png'
import { postTodo } from '../api'
import useStore from '../store';
import { format } from 'date-fns';
import styled from 'styled-components'

const TodoHeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 2%;
`

const TodoTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1%;
`

const TodoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const ColorBoxWrapper = styled.div`
  border: 1px solid;
  border-radius: 10px;
  height: 20%;
  display: flex;
  justify-content: start;
  gap: 1rem;
  padding-top: 1.2rem;
  padding-left: 1rem;
`

const ColorBox = styled.button<{ color: string; selected: boolean }>`
  border: none;
  border-radius: 100%;
  height: ${({ selected }) => (selected ? '70%' : '60%')}; 
  width: ${({ selected }) => (selected ? '5%' : '4%')}; 
  cursor: pointer;
  background-color: ${ ( props ) => props.color };
`


const Todo = () => {

  const { clickDate, setModalContent } = useStore()
  const [ title, setTitle ] = useState('')
  const [ memo, setMemo ] = useState('')
  const [ todoColor, setTodoColor ] = useState('BBDED6')

  const colors = [ '#BBDED6', '#FFE17D', '#C0DEFF', '#F7EDE2', '#A1A7C4' ] 

  const moveBack = () =>{
    setModalContent()
  }

  const setColor = (color) => {
    setTodoColor(color)
  };

  

  const makeTodo = useMutation( postTodo )

  const RegistTodo = async () => {
    if( title === '' ) {
      alert('제목 입력하세요')
      return
    }
    colors.push(todoColor)
    await makeTodo.mutateAsync({ title: title, content: memo, date: format(clickDate, 'yyyy-MM-dd' ), color:todoColor });
    // setModalContent()
    window.location.reload()
  }

  return(
    <>
    <TodoHeaderWrapper>
    <div style={{marginTop:'2%'}}>
      <LeftIcon size= { 20 } onClick={ moveBack }/>
    </div>
  <TodoTitle>
    <div style={{ fontSize:'20px'}}>일정 추가</div>
    <div style={{ fontSize: '10px', marginLeft: '2%' }}>{ format(clickDate, 'yyyy-MM-dd' )}</div>
  </TodoTitle>
  <div style={{marginTop:'2%'}}>
    <img src={ saveTodo } alt='' style={{ height: '40px', cursor: 'pointer' }} onClick={ RegistTodo }/>
  </div>
  </TodoHeaderWrapper>
  <TodoWrapper>
    <div style={{ fontSize: '16px'}}>제목</div>
    <input type="text" 
        style={{ height:'10%', borderRadius:'10px'}}
        value= { title }
        onChange={(e) => { setTitle( e.target.value )}}/>
    <div style={{ fontSize: '16px'}}>메모 (선택)</div>
    <textarea 
        style={{height:'35%', borderRadius: '10px'}} 
        value= { memo } onChange={(e) => { setMemo( e.target.value )}}/>
    <div style={{ fontSize: '16px'}}>색 선택</div>
    <ColorBoxWrapper>
    {
      colors?.map((color, index) => {
        return(
          <ColorBox key={ index } color={ color } selected={color === todoColor} onClick={() => setColor(color)}/>
        )
      })
    }
    </ColorBoxWrapper>
  </TodoWrapper>
    </>
  )
}

export default Todo