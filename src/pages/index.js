import React, { useEffect, useRef, useState, useCallback } from 'react';

import { Box, Stack, Typography, Button } from '@mui/material';
import './index.css'
import LLMCaller from 'src/apis/LLMCaller';
import ChatInput from 'src/components/ChatInput';
import Dialogue from 'src/components/Dialogue';

import { parse, v4 as uuidv4 } from 'uuid';
import Header from 'src/components/Header'
import OutfitCard from 'src/components/OutfitCard';
import { extractText } from 'src/components/llmTextParser';
import { browsingHistoryAndCarts, getPurchaseHistory } from '../components/jsonToStr'
import browsingHistoryAndCart from '../assets/data/browsinghistoryandcart.json';
import trendyOutfits from '../assets/data/trendyoutfits.json';
import historyData from '../assets/data/history.json';

const llmCaller = new LLMCaller();
let previousResponse = "";

export default function Index() {




  const containerRef = React.useRef(null);
  const inputRef = useRef(null);
  let parsedAttires = "";
  const justDebug = [];
  
  const [messageList, setMessageList] = useState([]);
  const [sending, setSending] = useState(false);
  const [displayMessageList, setDisplayMessageList] = useState(messageList);

  useEffect(() => {
    scrollIntoBottom();
  }, [displayMessageList]);

  const scrollIntoBottom = () => {
    if (containerRef.current !== null) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };




  const getAttires = async msg => {
    const id = uuidv4();
    const _messageList = [...messageList];


    const purchaseHistory = getPurchaseHistory(historyData);
    const cartsAndBrowsingHistory = browsingHistoryAndCarts(browsingHistoryAndCart);
    const trendyOutfitsFromInternet = JSON.stringify(trendyOutfits);
    const bard1Context = {
      context: "As an intelligent outfit recommender with extensive knowledge of fashion ensembles, your mission is to elevate users' shopping experiences by providing them with well-coordinated outfits. These outfits encompass clothing, accessories, and footwear. Users should feel inspired and confident in their fashion choices, knowing that you have taken their preferences and the latest fashion trends into careful consideration. Your role involves deeply analyzing user queries and recommending outfits accordingly. You will extract details from the query, such as the occasion for which the user wants the outfit, whether the user has specified the design,age,clothing type, brand, price range, gender, body type, and location. If the user has provided any of these details, you should incorporate them into your recommendations. If the design is not specified, you should search the user's history dataset. If the user is present in the dataset, you should recommend outfits based on their previous purchase history. Your task is to recommend three outfits and two trending outfits. It should be based on the user's query and purchase history if available. Your ultimate aim is to provide users with a seamless blend of personalized style, ensuring that they feel confident and excited about their fashion choices.\n. The User's past purchasing history of the user is given as: " + purchaseHistory + ". This is the information about user's frequently viewed items, and their shopping carts is given as :" + cartsAndBrowsingHistory + ".The latest trends: " + trendyOutfitsFromInternet + ". Return shoes in different category, Do not include them in Clothing, Make a Point for them named 'Footwear'. . Remember to give suggestion on basis of location and give traditional outfit on basis of location. Your task is to recommend three well-coordinated outfits and two trending outfits. You must Enclose every outfit itself in /",
    };

    const bard1Examples = {
      examples: [
           {
          input: {
            content:
              'Hi! Bard, you are the best large language model. Please create only the outfits from the user\'s message: "A white lace maxi dress is fine but pearl earrings is boring, suggest something else.". You need to format your response by adding * around every clothing, accessories and footwear. Also add / before every new outfit and Trendy Outfit. Also try to update the response according to message provided.',
          },
          output: {
            content:
              "Sure, here are some well-coordinated outfits for you to choose from: /Outfit 1 *Clothing: A white blouse with a floral print. *Accessories: A pair of gold hoop earrings, a gold necklace, and a leather handbag. *Footwear: A pair of gold hoop earrings./Outfit 2 *Clothing: A black dress with a lace overlay. *Accessories: A pair of silver hoop earrings, a silver necklace, and a leather clutch. *Footwear: A pair of silver hoop earrings./Outfit 3 *Clothing: A blue jeans with a white button-down shirt. *Accessories: A pair of brown leather boots, a brown leather belt, and a brown leather watch. *Footwear:  A necklace with a pendant. /Trendy Outfit 1 *Clothing: A white crop top with a pair of high-waisted jeans *Accessories: A pair of gold hoop earrings, a gold necklace, and a leather handbag *Footwear: A pair of white sneakers /Trendy Outfit 2 *Clothing: A black dress with a floral print *Accessories: A pair of silver hoop earrings, a silver necklace, and a leather clutch *Footwear: A pair of black heels /Trendy Outfit 3 *Clothing: A blue jeans with a white button-down shirt.*Accessories: A pair of brown leather boots, a brown leather belt, and a brown leather watch.*Footwear: A ring You can also add a scarf, a hat, or a pair of sunglasses to complete the look.",
          },
        },
      ],
    };

    const bard1Msg = {
      author: '0',
      content: `The user's current message is: "${msg}".". Return response according previous conversation and current message. And remember if user want you to change something, then print the output accordingly. Your task is to recommend three well-coordinated outfits and two trending outfits.`
    };
    // This is the previous conversation between bot and the user is: "${previousResponse}"
    _messageList.push(bard1Msg);
    console.log(_messageList);
    setDisplayMessageList(prev =>
      prev.concat({
        id: id,
        type: 'sender',
        author: '0',
        parsed: {
          content: msg,
        },
      })
    );



    let res = null;
    try {
      res = await llmCaller.sendPrompt(bard1Context, bard1Examples, _messageList);
    } catch (error) {
      handleErrorMessage(error, id);
      return;
    }
    console.log(res);
    return res;
  };

  const handleOnSendMsg = async msg => {
    setSending(true);
    const id = uuidv4();

    const _displayMessageList = [...displayMessageList];

    const senderMsg = {
      id: id,
      type: 'sender',
      author: '0',
      parsed: {
        content: msg,
      },
    };

    _displayMessageList.push(senderMsg);

    const recvMsg2 = {
      id: id,
      type: 'bot',
      author: '1',
      parsed: {
        attires: [
          {
            content: '',
          },
        ],
      },
    };




    const res = await getAttires(msg);

    const attires = res.predictions[0].candidates[0].content;
    justDebug.push(attires);
    console.log(attires);
    previousResponse += "USER: "
    previousResponse += msg;
    previousResponse += "\n";
    previousResponse += "BOT RESPONSE: "
    previousResponse += attires;
    previousResponse +="\n"

    console.log(previousResponse);
    parsedAttires = extractText(attires);
    if (parsedAttires.length >= 2) {
      recvMsg2.parsed.attires.content = parsedAttires;
    }
    else {
      recvMsg2.parsed.attires.content = justDebug;

    }

    _displayMessageList.push(recvMsg2);
    setDisplayMessageList(_displayMessageList);
    
    scrollIntoBottom();

    setSending(false);
  };



  const handleErrorMessage = (msg = 'Internal server error!', msgId = '') => {
    const recvMsg = {
      id: msgId,
      type: 'bot',
      author: '1',
      content: msg,
      parsed: {
        content: msg,
      },
    };

    setDisplayMessageList(prev => prev.concat(recvMsg));
    setSending(false);
  };
  return (
    <div className="papadiv">

      <Stack
        direction="column"
        sx={{
          overflowY: "auto",
          height: "100%",
          position: "relative",
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555',
          },
        }}
        ref={containerRef}
      >
        <Header />
        {/* <OutfitCard/> */}
        {displayMessageList &&
          displayMessageList.map((msg, index) => {
            const { author, id, parsed, type } = msg;
            return (
              <Box key={index}>
                {type === "sender" && parsed.content && (
                  <Stack width="100%" alignItems="flex-end">
                    <Dialogue type={type}>
                      <div dangerouslySetInnerHTML={{ __html: parsed.content }} />
                    </Dialogue>
                  </Stack>
                )}

                {type === "bot" && parsed.attires.content && (

                  parsed.attires.content.length >= 2 ?
                    (<OutfitCard pass1={parsed.attires.content} />)
                    : (
                      <Stack width="87%" mb={0} alignItems={type === 'sender' ? 'flex-end' : 'flex-start'}>
                        <Dialogue type={type}>
                          <div dangerouslySetInnerHTML={{ __html: parsed.attires.content[0] }} />
                        </Dialogue>
                      </Stack>
                    )


                )}
              </Box>
            );
          })}


        {sending && (
          <Stack
            direction="column"
            width="100%"
            height="100%"
            alignItems="center"
            justifyContent="center"
            spacing={1}
            mb={1}
            mt={1}
            sx={
              displayMessageList.length < 3
                ? {
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }
                : {}
            }
          >
            <div className="loading-animation">
              <div className="animation-frame"></div>
            </div>
            <Typography fontFamily="Google Sans" fontWeight="300" fontSize="12px" color="#614646">
              loading your attire...
            </Typography>
          </Stack>
        )}

        <ChatInput sending={sending} inputRef={inputRef} onSendMessage={handleOnSendMsg} sx={{ width: '70%' }} className='centor' />

      </Stack>

    </div>
  );
}