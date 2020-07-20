import { trigger, state, style, transition, keyframes, animate } from '@angular/animations';

export const Animations = {
    'animation-shake-error': trigger('animation-shake-error', [
        state('void', style({
            opacity: 1
        })),
        transition('void => erro-ocorrido', [
            animate('1000ms 0s ease-in-out', keyframes([
                style({ offset: 0.15, opacity: 1, transform: 'translateX(0)' }),
                style({ offset: 0.86, opacity: 1, transform: 'translateX(0)' }),
                style({ offset: 0.88, opacity: 1, transform: 'translateY(-10px)' }),
                style({ offset: 0.90, opacity: 1, transform: 'translateY(10px)' }),
                style({ offset: 0.92, opacity: 1, transform: 'translateY(-10px)' }),
                style({ offset: 0.94, opacity: 1, transform: 'translateY(10px)' }),
                style({ offset: 0.96, opacity: 1, transform: 'translateY(-10px)' }),
                style({ offset: 0.98, opacity: 1, transform: 'translateY(10px)' }),
                style({ offset: 1, opacity: 1, transform: 'translateY(0)' })
            ]))
        ])
    ]),
    'animacao-banner': trigger('animacao-banner', [
        state('criado', style({
          opacity: 1
        })),
        transition('void => criado', [
          style({ opacity: 0, transform: 'translate(-50px, 0)' }),
          animate('800ms 0s ease-in-out')
        ])
    ]),
    'animacao-painel': trigger('animacao-painel', [
        state('criado', style({
            opacity: 1
        })),
        transition('void => criado', [
            style({ opacity: 0, transform: 'translate(50px, 0' }),
            animate('800ms 0s ease-in-out')
        ])
    ])
}