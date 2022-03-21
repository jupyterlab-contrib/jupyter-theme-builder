import { typeRampBaseFontSize } from '@jupyter-notebook/web-components/node_modules/@microsoft/fast-components';
import { parseColor } from '@microsoft/fast-colors';
import {
  accentPalette,
  baseLayerLuminance,
  controlCornerRadius,
  fillColor,
  neutralLayer1,
  neutralLayer1Recipe,
  neutralLayer2,
  neutralLayer3,
  neutralLayer4,
  neutralPalette,
  PaletteRGB,
  SwatchRGB
} from '@microsoft/fast-components';
import {
  css,
  customElement,
  ExecutionContext,
  FASTElement,
  html,
  observable
} from '@microsoft/fast-element';

function targetValue(ctx: ExecutionContext) {
  return (ctx.event.target! as any).value;
}

const template = html<ThemeDesigner>`
  <div id="designPallette">
    <h2>Design System Properties</h2>
    <p>
      cornerRadius: <label>${x => x.cornerRadius}</label>px
      <jp-slider
        orientation="horizontal"
        min="0"
        max="50"
        step="1"
        value=${x => x.cornerRadius}
        @change=${(x, c) => {
          x.cornerRadius = targetValue(c);
        }}
      >
        <jp-slider-label position="0"> 0px </jp-slider-label>
        <jp-slider-label position="50"> 50px </jp-slider-label>
      </jp-slider>
    </p>
    <br />
    <!--
            <p>
            disabledOpacity: <label id="currentOpacity">0</label>%
            <jp-slider
                id="opacityControl"
                orientation="horizontal"
                min="0"
                max="1"
                step="0.01"
            >
                <jp-slider-label position="0"> 0% </jp-slider-label>
                <jp-slider-label position="100"> 100% </jp-slider-label>
            </jp-slider>
            </p>
            <br />
        -->
    <p>
      Font Size:
      <label>${x => x.fontSize}</label>px
      <jp-slider
        orientation="horizontal"
        min="8"
        max="20"
        step="1"
        value=${x => x.fontSize}
        @change=${(x, c) => {
          x.fontSize = targetValue(c);
        }}
      >
        <jp-slider-label position="8"> 8px </jp-slider-label>
        <jp-slider-label position="20"> 20px </jp-slider-label>
      </jp-slider>
    </p>
    <br />
    <p>
      baseLayerLuminance:
      <label id="currentbaseLayerLuminance">${x => x.baseLayerLuminance}</label>
      <jp-slider
        id="baseLayerLuminanceControl"
        orientation="horizontal"
        min="0"
        max="1"
        step="0.01"
        value=${x => x.baseLayerLuminance}
        @change=${(x, c) => {
          x.baseLayerLuminance = targetValue(c);
        }}
      >
        <jp-slider-label position="0"> Black </jp-slider-label>
        <jp-slider-label position="0.23"> Dark </jp-slider-label>
        <jp-slider-label position="1"> Light </jp-slider-label>
      </jp-slider>
    </p>
    <br />
    <p>
      <label
        >Accent color picker:
        <input
          type="color"
          value=${x => x.accentColor}
          @change=${(x, c) => {
            x.accentColor = targetValue(c);
          }}
      /></label>
      <br />
      <label
        >Neutral color picker:
        <input
          type="color"
          value=${x => x.neutralColor}
          @change=${(x, c) => {
            x.neutralColor = targetValue(c);
          }}
      /></label>
    </p>
    <!--
        <br />
        <jp-text-field type="number">designUnit:</jp-text-field>
        <jp-text-field type="number">density:</jp-text-field>
        <jp-text-field type="number">
        baseHeightMultiplier:
        </jp-text-field>
        <jp-text-field type="number"
        >baseHorizontalSpacingMultiplier:
        </jp-text-field>
        <jp-text-field type="number"
        >outlineWidth:</jp-text-field
        >
        <jp-progress min="0" max="100" value="100"></jp-progress>
    -->
        </div>
`;

const styles = css`
  :host {
    color: var(--jp-ui-font-color1);
    font-size: var(--jp-ui-font-size1);
    font-family: var(--jp-ui-font-family);
  }

  #designPallette {
    padding: 0 10px;
  }

  h2 {
    font-size: var(--jp-ui-font-size2);
  }
`;

@customElement({
  name: 'jupyter-ext-theme-designer',
  template,
  styles
})
export class ThemeDesigner extends FASTElement {
  app: HTMLElement = document.body;

  @observable
  cornerRadius? = 2;
  cornerRadiusChanged(prev?: number, next?: number): void {
    if (next) {
      controlCornerRadius.setValueFor(this.app, next);

      this.app.style.setProperty('--jp-border-radius', `${next}px`);
    }
  }

  @observable
  fontSize? = 13;
  fontSizeChanged(prev?: number, next?: number): void {
    if (next) {
      typeRampBaseFontSize.setValueFor(this.app, `${next}px`);

      // FIXME get the ratio
      this.app.style.setProperty('--jp-ui-font-size0', `${next / 1.2}px`);
      this.app.style.setProperty('--jp-ui-font-size1', `${next}px`);
      this.app.style.setProperty('--jp-ui-font-size2', `${next * 1.2}px`);
      this.app.style.setProperty('--jp-ui-font-size3', `${next * 1.2 * 1.2}px`);

      this.app.style.setProperty(
        '--jp-content-font-size0',
        `${(next + 1) / 1.2}px`
      );
      this.app.style.setProperty('--jp-content-font-size1', `${next + 1}px`);
      this.app.style.setProperty(
        '--jp-content-font-size2',
        `${(next + 1) * 1.2}px`
      );
      this.app.style.setProperty(
        '--jp-content-font-size3',
        `${(next + 1) * 1.2 * 1.2}px`
      );
      this.app.style.setProperty(
        '--jp-content-font-size4',
        `${(next + 1) * 1.2 * 1.2 * 1.2}px`
      );
      this.app.style.setProperty(
        '--jp-content-font-size5',
        `${(next + 1) * 1.2 * 1.2 * 1.2}px`
      );
    }
  }

  @observable
  baseLayerLuminance? = 1.0;
  baseLayerLuminanceChanged(prev: number | undefined, next: number): void {
    if (prev === undefined) {
      return;
    }

    baseLayerLuminance.setValueFor(this.app, next);
    // work around for deep dependency hierarchy bug in DesignToken.
    // TODO: Change to fillColor.setValueFor(this.app, neutralLayerL1) https://github.com/microsoft/fast/pull/5056
    fillColor.setValueFor(
      this.app,
      neutralLayer1Recipe.getValueFor(this.app).evaluate(this.app)
    );

    // FIXME
    this.app.style.setProperty(
      '--jp-layout-color0',
      neutralLayer1.getValueFor(this.app).toColorString()
    );
    this.app.style.setProperty(
      '--jp-layout-color1',
      neutralLayer1.getValueFor(this.app).toColorString()
    );
    this.app.style.setProperty(
      '--jp-layout-color2',
      neutralLayer2.getValueFor(this.app).toColorString()
    );
    this.app.style.setProperty(
      '--jp-layout-color3',
      neutralLayer3.getValueFor(this.app).toColorString()
    );
    this.app.style.setProperty(
      '--jp-layout-color4',
      neutralLayer4.getValueFor(this.app).toColorString()
    );
  }

  @observable
  accentColor = '#1976d2';
  accentColorChanged(prev?: string, next?: string): void {
    if (next) {
      const { r, g, b } = parseColor(next)!;
      accentPalette.setValueFor(
        this.app,
        PaletteRGB.from(SwatchRGB.create(r, g, b))
      );

      this.app.style.setProperty('--jp-brand-color1', next);
    }
  }

  @observable
  neutralColor = '#808080';
  neutralColorChanged(prev?: string, next?: string): void {
    if (next) {
      const { r, g, b } = parseColor(next)!;
      neutralPalette.setValueFor(
        this.app,
        PaletteRGB.from(SwatchRGB.create(r, g, b))
      );

      // FIXME
      this.app.style.setProperty(
        '--jp-layout-color0',
        neutralLayer1.getValueFor(this.app).toColorString()
      );
      this.app.style.setProperty(
        '--jp-layout-color1',
        neutralLayer1.getValueFor(this.app).toColorString()
      );
      this.app.style.setProperty(
        '--jp-layout-color2',
        neutralLayer2.getValueFor(this.app).toColorString()
      );
      this.app.style.setProperty(
        '--jp-layout-color3',
        neutralLayer3.getValueFor(this.app).toColorString()
      );
      this.app.style.setProperty(
        '--jp-layout-color4',
        neutralLayer4.getValueFor(this.app).toColorString()
      );
    }
  }
}
