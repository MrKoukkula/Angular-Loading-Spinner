import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[loading]',
})
export class SpinnerDirective implements OnInit, OnChanges {
  @HostBinding('style.position') hostPosition: string = 'relative';
  @Input() loading: boolean = false;

  constructor(private targetEl: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const loadingContainer = this.renderer.createElement('div');
    this.renderer.setStyle(
      loadingContainer,
      'display',
      this.loading ? 'flex' : 'none'
    );
    this.renderer.setStyle(loadingContainer, 'justify-content', 'center');
    this.renderer.setStyle(loadingContainer, 'align-items', 'center');
    this.renderer.setStyle(loadingContainer, 'position', 'absolute');
    this.renderer.setStyle(loadingContainer, 'top', '0');
    this.renderer.setStyle(
      loadingContainer,
      'background',
      'rgba(0, 0, 0, 0.0)'
    );
    this.renderer.setStyle(loadingContainer, 'width', '100%');
    this.renderer.setStyle(loadingContainer, 'height', '100%');

    this.renderer.addClass(loadingContainer, 'ThisShouldBeUniqueClassLoadingSpinner');

    const spinnerContainer = this.renderer.createElement('div');

    this.renderer.setStyle(spinnerContainer, 'width', '50px');
    this.renderer.setStyle(spinnerContainer, 'height', '50px');
    this.renderer.setStyle(spinnerContainer, 'border-radius', '50%');
    this.renderer.setStyle(
      spinnerContainer,
      'border',
      '5px solid rgba(29, 161, 242, 0.2)'
    );
    this.renderer.setStyle(
      spinnerContainer,
      'border-left-color',
      'rgb(29, 161, 242)'
    );
    this.renderer.setStyle(spinnerContainer, 'background', 'transparent');

    this.renderer.setStyle(
      spinnerContainer,
      'animation',
      'spinnerAnimation 500ms infinite linear'
    );

    this.renderer.appendChild(loadingContainer, spinnerContainer);

    this.renderer.appendChild(this.targetEl.nativeElement, loadingContainer);
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.loading) {
      const container = this.targetEl.nativeElement;
      const div = container.querySelector('.ThisShouldBeUniqueClassLoadingSpinner');
      if (div) {
        this.renderer.setStyle(div, 'display', this.loading ? 'flex' : 'none');
      }
    }
  }
}
