import AppLogo from '../../assets/logo.png';
import styled from 'styled-components';

const Image = styled.img`
	width: 64px;
	height: 64px;
`;

const Logo = () => (
	<Image src={AppLogo} />
);

export {
	Logo,
};
