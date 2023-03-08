import React,{useState} from 'react';
import styled,{css} from "styled-components";
import {Icon} from "@components/Icon";

export const Combobox = ({placeholder,items,selectItem,onChange,icon}) => {
    const selectedLabel = items && items.length > 0 && selectItem ? items.find((item)=>Number(item.value) === Number(selectItem)).label : placeholder;

    const [isOpen,setIsOpen] = useState(false);

    const changeClosing = () => {
        if(items && items.length > 0) {
            setIsOpen(!isOpen)
        }
    }

    const changeItem = (value) => {
        if(onChange){
            onChange(Number(value));
        }
        setIsOpen(false);
    }

    const boxStyle = {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    }

    return <Container onClick={changeClosing}>
        {/*{placeholder && <Placeholder>{placeholder}</Placeholder>}*/}
        <SelectedContainer>
            {icon && <Icon  name={icon} width={24} height={24} style={{fill: '#063b87'}}/>}
            <SelectLabel>
                {selectedLabel}
            </SelectLabel>
            <ArrowContainer onPress={changeClosing}>
                {isOpen ? <Icon  name={'keyboard_arrow_up'} width={19} height={19} style={{fill: '#063b87'}}/>  :
                    <Icon  name={'keyboard_arrow_down'} width={19} height={19} style={{fill: '#063b87'}}/>}
            </ArrowContainer>
        </SelectedContainer>
        {isOpen && items &&
        <List style={boxStyle}>
            {items.map((item,index)=>{
                return <ListItem key={`list-item-${index}`} onClick={()=>changeItem(item.value)}>{item.label}</ListItem>
            })}
        </List>}
    </Container>
};

const ListItem = styled.div`
  height: auto;
  display: flex;
  align-items: center;
  padding: 5px 0;
  margin: 8px 0;
  color: #191e32;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: .2px;
`

const List = styled.div`
    width: 100%;
    overflow: auto;
    position: absolute;
    top: 56px;
    left: 0;
    padding: 0 20px;
    z-index: 10;
    border: #dcdcdc;
    border-width: 1px;
 
    
    color: #040424;
    vertical-align: baseline;
    box-shadow: 0 0 12px 0 rgba(0,0,0,.3);
    border-radius: 5px;
    height: auto;
    max-height: 200px;
    background: #fff;
`

const ArrowContainer = styled.div`
    width: 20px;
    height: 20px;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    right: 1px;
`

const SelectLabel = styled.div`
  color: #063b87;
  font-size: 16px;
  margin-left: 10px;
`

const SelectedContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 5px 0 0;
    position: relative;
    color: #040424;
    vertical-align: baseline;
    height: 60px;
    background: rgba(0,0,0,0);
    border-bottom: 1px solid rgb(6, 59, 135);
    cursor: pointer;
    overflow: hidden;
    transition: border .1s linear;
`

const Container = styled.div`
    width: 400px;
    max-width: 100%;
    margin: auto;
    padding: 0;
    position: relative;
`

const Placeholder = styled.div`
  color: #063b87;
  font-size: 12px;
  margin-top: 5px;
`