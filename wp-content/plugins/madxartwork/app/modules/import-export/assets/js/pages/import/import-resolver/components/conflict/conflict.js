import { useContext } from 'react';

import { ImportContext } from '../../../../../context/import-context/import-context-provider';
import { SharedContext } from '../../../../../context/shared-context/shared-context-provider';

import ConflictCheckbox from './components/conflict-checkbox/conflict-checkbox';
import Heading from 'madxartwork-app/ui/atoms/heading';
import Text from 'madxartwork-app/ui/atoms/text';
import Grid from 'madxartwork-app/ui/grid/grid';
import Button from 'madxartwork-app/ui/molecules/button';
import { appsEventTrackingDispatch } from 'madxartwork-app/event-track/apps-event-tracking';

export default function Conflict( props ) {
	const importContext = useContext( ImportContext ),
		sharedContext = useContext( SharedContext ),
		manifest = importContext.data.uploadedData?.manifest,
		{ currentPage } = sharedContext.data,
		getConflictTitle = ( id ) => {
			const templateType = manifest.templates[ id ].doc_type,
				summaryTitle = madxartworkAppConfig[ 'import-export' ].summaryTitles.templates?.[ templateType ];

			return summaryTitle?.single || templateType;
		},
		getEditTemplateButton = ( editUrl, title ) => (
			<Button
				className="e-app-import-resolver-conflicts__edit-template"
				url={ editUrl }
				target="_blank"
				icon="eicon-editor-external-link"
				text={ __( 'Edit Template', 'madxartwork' ) }
				hideText
				onClick={ () => {
					if ( props.onClick ) {
						props.onClick( title );
					}
				} }
			/>
		),
		isImportedAssetSelected = ( importedAssetId ) => importContext.data.overrideConditions.includes( importedAssetId ),
		getAssetClassName = ( isActive ) => {
			const classes = [ 'e-app-import-resolver-conflicts__asset' ];

			if ( isActive ) {
				classes.push( 'active' );
			}

			return classes.join( ' ' );
		},
		getImportedAssetClasses = ( importedAssetId ) => getAssetClassName( isImportedAssetSelected( importedAssetId ) ),
		getExistingAssetClasses = ( importedAssetId ) => getAssetClassName( ! isImportedAssetSelected( importedAssetId ) ),
		eventTracking = ( command, title ) => appsEventTrackingDispatch(
			`kit-library/${ command }`,
			{
				item: title,
				page_source: 'import',
				step: currentPage,
				event_type: 'click',
			},
		);
	return (
		<Grid container noWrap>
			<ConflictCheckbox
				id={ props.importedId }
				type="main-type"
				className="e-app-import-resolver-conflicts__checkbox"
				onCheck={ ( isChecked ) => {
					const command = isChecked && isChecked ? 'check' : 'uncheck';
					eventTracking( command, props.conflictData.template_title );
				} }
			/>

			<Grid item>
				<Heading variant="h5" tag="h4" className="e-app-import-resolver-conflicts__title">
					{ getConflictTitle( props.importedId ) }
				</Heading>

				<Grid item>
					<Text variant="sm" tag="span" className={ getImportedAssetClasses( props.importedId ) }>
						{ __( 'Imported', 'madxartwork' ) }: { manifest.templates[ props.importedId ].title }
					</Text>

					<Text style variant="sm" tag="span" className={ getExistingAssetClasses( props.importedId ) }>
						{ __( 'Existing', 'madxartwork' ) }: { props.conflictData.template_title } { getEditTemplateButton( props.conflictData.edit_url, props.conflictData.template_title ) }
					</Text>
				</Grid>
			</Grid>
		</Grid>
	);
}

Conflict.propTypes = {
	importedId: PropTypes.number,
	conflictData: PropTypes.object,
	onClick: PropTypes.func,
};
