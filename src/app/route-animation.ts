import {trigger, animate, transition,state, style, query} from '@angular/animations';


export const fadeAnimation =
  trigger('fadeAnimation', [
    transition('* <=> *', [
      query(':leave',[
        style({
          transform: 'scale(1)',
          position : 'absolute',
          width : '100%',
          height : '100%',
          opacity : 1,
          overflow : 'hidden',
        })
      ],{ optional: true }),
      query(':enter', [
        style({
          transform: 'scale(1.03)',
          position : 'absolute',
          width : '100%',
          height : '100%',
          opacity : 0,

        })
      ],{ optional: true }),

      query(':leave', [
        animate('600ms ease',
          style({
            transform: 'scale(1.1)',
            opacity : 0,

          })
        )
      ],{ optional: true }),
      query(':enter', [
        animate('600ms ease',
          style({
            transform: 'scale(1)',
            opacity: 1,
          })
        )
      ],{ optional: true }),

    ])
  ]);
