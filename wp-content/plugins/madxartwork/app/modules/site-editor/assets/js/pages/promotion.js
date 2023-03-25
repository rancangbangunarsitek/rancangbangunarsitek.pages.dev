import AllPartsButton from '../organisms/all-parts-button';
import Button from 'madxartwork-app/ui/molecules/button';
import CardOverlay from 'madxartwork-app/ui/card/card-overlay';
import Grid from 'madxartwork-app/ui/grid/grid';
import Heading from 'madxartwork-app/ui/atoms/heading';
import Layout from '../templates/layout';
import SiteParts from '../organisms/site-parts';
import Text from 'madxartwork-app/ui/atoms/text';

import './promotion.scss';

export default function Promotion() {
	const promotionUrl = 'https://go.madxartwork.com/go-pro-theme-builder/',
		PromotionHoverElement = ( props ) => {
			const promotionUrlWithType = `${ promotionUrl }?type=${ props.type }`;
			return (
				<CardOverlay className="e-site-editor__promotion-overlay">
					<a className="e-site-editor__promotion-overlay__link" target="_blank" rel="noopener noreferrer" href={ promotionUrlWithType }>
						<i className="e-site-editor__promotion-overlay__icon eicon-lock" />
						<Button size="sm" color="cta" variant="contained" text={ __( 'Upgrade', 'madxartwork' ) } />
					</a>
				</CardOverlay>
			);
		};

	PromotionHoverElement.propTypes = {
		className: PropTypes.string,
		type: PropTypes.string.isRequired,
	};

	return (
		<Layout allPartsButton={ <AllPartsButton promotion /> } promotion>
			<section className="e-site-editor__promotion">
				<Grid container className="page-header">
					<Grid item sm={ 7 } justify="end">
						<Heading variant="h1">
							{ __( 'Customize every part of your site', 'madxartwork' ) }
						</Heading>
						<Text>
							{ __( 'Get total control, consistency and a faster workflow by designing the recurring parts that make up a complete website like the Header & Footer, Archive, 404, WooCommerce pages and more.', 'madxartwork' ) }
						</Text>
					</Grid>
					<Grid item container justify="end" alignItems="start" sm={ 5 }>
						<Button
							size="sm"
							color="cta"
							variant="contained"
							url={ promotionUrl }
							target="_blank"
							text={ __( 'Upgrade Now', 'madxartwork' ) }
						/>
					</Grid>
				</Grid>
				<hr className="eps-separator" />
				<SiteParts hoverElement={ PromotionHoverElement } />
			</section>
		</Layout>
	);
}
