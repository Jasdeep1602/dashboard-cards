/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import './card.css';
import { useState } from 'react';

export default function Cards({ data }: any) {
  console.log(data, 'vcwdvgc');

  // local states and logic for description expansion

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = (value: any) => {
    console.log(value, 'bde');

    setIsExpanded(!isExpanded);
  };

  // custom button styles

  const ApplyButton = styled(Button)<ButtonProps>(() => ({
    color: 'black',
    backgroundColor: '#54EFC3',
    textTransform: 'none',
    fontSize: '13px',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#54EFC3',
    },
  }));

  const ShowButton = styled(Button)<ButtonProps>(() => ({
    color: '#54EFC3',
    textTransform: 'none',
    fontSize: '13px',
    width: 'fit-content',
    fontWeight: 'bold',
    marginTop: '-5px',
    '&:hover': {
      backgroundColor: 'white',
    },
  }));

  return (
    <>
      {data &&
        data?.map((cardData: any) => (
          <Card variant='outlined' key={cardData?.jdUid}>
            <div className='cards'>
              <div className='logodata'>
                <img src={cardData?.logoUrl} alt='image' width='14%' />
                <div className='rightdata'>
                  <p className='companyName'>{cardData?.companyName}</p>
                  <p className='jobRole'>{cardData?.jobRole}</p>
                </div>
              </div>
              <div className='location'>{cardData?.location}</div>

              {isExpanded ? (
                <div>
                  <div className='details'>
                    <p className='exp'>Job Description:</p>
                    {cardData?.jobDetailsFromCompany}
                  </div>
                  <ShowButton onClick={() => toggleExpand(cardData?.jdUid)}>
                    Show less
                  </ShowButton>
                </div>
              ) : (
                <>
                  <div className='details'>
                    <p className='exp'>Job Description:</p>

                    {cardData?.jobDetailsFromCompany.slice(0, 300)}
                    {cardData?.jobDetailsFromCompany.length > 300 && (
                      <span>...</span>
                    )}
                  </div>
                  <ShowButton onClick={() => toggleExpand(cardData?.jdUid)}>
                    Show more
                  </ShowButton>
                </>
              )}
              <div className='expfull'>
                <p className='exp'>Minimum Experience</p>
                {cardData?.minExp} {cardData?.minExp === null ? '0' : ''}{' '}
                {cardData?.minExp === 1 ? 'year' : 'years'}
              </div>

              <ApplyButton>⚡ Easy Apply</ApplyButton>
            </div>
          </Card>
        ))}
    </>
  );
}
