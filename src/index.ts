import {
  ILabShell,
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { Widget } from '@lumino/widgets';
import {
  jpCard,
  jpSlider,
  jpSliderLabel,
  provideJupyterDesignSystem
} from '@jupyter-notebook/web-components';

export { ThemeDesigner } from './designer';
import {
  accentColor,
  baseLayerLuminance,
  controlCornerRadius,
  neutralColor,
  SwatchRGB,
  typeRampBaseFontSize
} from '@microsoft/fast-components';

provideJupyterDesignSystem().register(jpCard(), jpSliderLabel(), jpSlider());

/**
 * Initialization data for the jupyter-theme-builder extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyter-theme-builder:plugin',
  optional: [ILabShell],
  autoStart: true,
  activate: (app: JupyterFrontEnd, labShell: ILabShell | null) => {
    console.log('JupyterLab extension jupyter-theme-builder is activated!');

    accentColor.withDefault(SwatchRGB.create(0, 0, 0));
    neutralColor.withDefault(SwatchRGB.create(0.5, 0.5, 0.5));
    controlCornerRadius.withDefault(2);
    typeRampBaseFontSize.withDefault('13px');
    baseLayerLuminance.withDefault(1.0);

    // const designer = new ThemeDesigner();

    if (labShell) {
      const designerWidget = new Widget({
        tag: 'jupyter-ext-theme-designer' as any
      });
      designerWidget.id = 'theme-designer';
      designerWidget.title.label = 'Designer';

      labShell.add(designerWidget, 'left', { rank: 1000 });
    }
  }
};

export default plugin;
