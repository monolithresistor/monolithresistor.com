import React from 'react';
import styled from 'styled-components';
import { down, only, up } from 'styled-breakpoints';
import { oc } from 'ts-optchain';
import theme, { Theme } from '../theme';
import { PrismicDocumentBase, PrismicImage, PrismicSlice, PrismicKeyText } from '../prismic';

const Image = styled.div<{ image: PrismicImage }>`
  position: relative;
  background-image: url(${props => props.image.url});
  background-size: cover;
  background-position: center center;
  height: 120px;

  ${only('sm')} {
    height: 200px;
  }

  ${only('md')} {
    height: 320px;
  }

  ${only('lg')} {
    height: 400px;
  }

  ${up('lg')} {
    height: 34vw;
  }
`;

const Title = styled.div<{ theme: Theme }>`
  position: absolute;
  display: inline-block;
  text-align: right;

  ${down('xs')} {
    font-size: 32px;
    right: 10px;
    bottom: 10px;
  }

  ${only('sm')} {
    font-size: 48px;
    right: 16px;
    bottom: 16px;
  }

  ${only('md')} {
    font-size: 64px;
    right: 24px;
    bottom: 24px;
  }

  ${up('lg')} {
    font-size: 10vw;
    right: 1vw;
    bottom: 1vw;
  }
`;

const LightTitle = styled(Title)`
  color: ${props => props.theme.colors.accentLight};
  text-shadow: 0.1vw 0.2vw 0.2vw ${props => props.theme.colors.shadow};
`;

const DarkTitle = styled(Title)`
  color: ${props => props.theme.colors.accentDark};

  ${down('md')} {
    text-shadow:
      -1px -1px 0 ${props => props.theme.colors.background},
      1px -1px 0 ${props => props.theme.colors.background},
      -1px 1px 0 ${props => props.theme.colors.background},
      1px 1px 0 ${props => props.theme.colors.background},
      2px 3px 2px ${props => props.theme.colors.shadow};
  }

  ${up('md')} {
    text-shadow:
      -0.1vw -0.1vw 0 ${props => props.theme.colors.background},
      0.1vw -0.1vw 0 ${props => props.theme.colors.background},
      -0.1vw 0.1vw 0 ${props => props.theme.colors.background},
      0.1vw 0.1vw 0 ${props => props.theme.colors.background},
      0.2vw 0.3vw 0.2vw ${props => props.theme.colors.shadow};
  }
`;

interface HeroNonRepeatable {
  hero_title: PrismicKeyText;
  hero_title_style: 'Light' | 'Dark';
  hero_image: PrismicImage;
}

export type HeroSlice = PrismicSlice<HeroNonRepeatable, null, 'hero'>;

const Hero: React.FunctionComponent<HeroNonRepeatable> = props => {
  const title = oc(props).hero_title();
  const titleStyle = oc(props).hero_title_style();
  const image = oc(props).hero_image();

  if (!image) {
    throw new Error('No image');
  }

  return (
    <Image image={image}>
      {title && titleStyle === 'Light' && <LightTitle>{title}</LightTitle>}
      {title && titleStyle === 'Dark' && <DarkTitle>{title}</DarkTitle>}
    </Image>
  )
};

export default Hero;
