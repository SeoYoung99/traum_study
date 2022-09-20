import React from "react";
import {RecoilRoot, atom, selector, useRecoilState, useRecoilValue} from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <CharacterCounter/>
    </RecoilRoot>
  );
}

export default App;

function CharacterCounter(){
  return(
    <div>
      <TextInput/>
      <CharacterCount/>
    </div>
  );
}

//atom
const textState = atom({
  key : 'textState',
  default: ''
});


function TextInput(){
  //useRecoilState로 atom을 읽고 씀
  const [text, setText] = useRecoilState(textState); 

  const onChange = (e) => {
    //atom에 입력값을 세팅
    setText(e.target.value)
  };

  return(
    <div>
      <input type='text'value={text} onChange={onChange}/>
      <br/>
      Echo: {text}
    </div>
  )
}

//파생된 상태의 일부
const charCountState = selector({
  key: 'charCountState',
  get: ({get}) => {
    //아톰에서 가져온 상태
    const text = get(textState);
    //의 일부
    return text.length
  },
});

function CharacterCount(){
  //useRecoilValue로 selector에 접근
  const count = useRecoilValue(charCountState);

  return<>Character Count: {count}</>
}