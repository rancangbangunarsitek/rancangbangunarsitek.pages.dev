import React, { useContext, useState, useEffect } from 'react';
import { SharedContext } from '../../context/shared-context/shared-context-provider';
import Select2 from 'madxartwork-app/ui/molecules/select2';
import Text from 'madxartwork-app/ui/atoms/text';
import TextField from 'madxartwork-app/ui/atoms/text-field';

export default function CptSelectBox() {
	const sharedContext = useContext( SharedContext ),
	{ customPostTypes } = sharedContext.data || [],
	[ selected, setSelected ] = useState( [] );

	useEffect( () => {
		setSelected( arrayValueIterator( customPostTypes ) );
	}, [ customPostTypes ] );

	useEffect( () => {
		sharedContext.dispatch( { type: 'SET_SELECTED_CPT', payload: selected } );
	}, [ selected ] );

	const arrayValueIterator = ( array ) => {
		return array.map( ( { value } ) => value );
	};

	const selectedCpt = ( selectedValue ) => {
		setSelected( arrayValueIterator( Array.from( selectedValue ) ) );
	};

	return (
		<>
			<Text variant="sm" tag="p" className="e-app-export-kit-content__description">
				{ __( 'Custom Post Type', 'madxartwork' ) }
			</Text>
			{ customPostTypes.length > 0
				? <Select2
						multiple
						settings={ { width: '100%' } }
						options={ customPostTypes }
						onChange={ ( e ) => selectedCpt( e.target.selectedOptions ) }
						value={ selected }
						placeholder={ __( 'Click to select custom post types', 'madxartwork' ) }
				/>
				: <TextField
						variant="outlined"
						// eslint-disable-next-line @wordpress/i18n-ellipsis
						placeholder={ __( 'No custom post types in your site...', 'madxartwork' ) }
						className="e-app-export-kit-content__disabled"
				/>
			}
			<Text variant="sm" tag="span" className="e-app-export-kit-content__small-notice">
				{ __( 'Add the custom posts types to export. The latest 20 items from each type will be included.', 'madxartwork' ) }
			</Text>
		</>
	);
}
