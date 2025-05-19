import { Category, type PricingData } from '@/types/pricing';

export const pricingData: PricingData = {
  [Category.Portraits]: [
    {
      title: 'Essential Package',
      description: [
        { title: '1 Hour Photoshoot' },
        { title: '1 Location' },
        { title: 'Includes Standard Editing' },
        { title: '1 Revision' },
        { title: 'Optional: Premium Retouching ($30/image)' },
        { title: 'Optional: Express Delivery ($50)' },
        { title: 'Optional: Raw Files ($500)' },
      ],
      price: '$140',
    },
    {
      title: 'Extended Package',
      description: [
        { title: '2 Hours Photoshoot' },
        { title: '1 Location' },
        { title: 'Includes Standard Editing' },
        { title: '2 Revisions' },
        { title: 'Optional: Premium Retouching ($30/image)' },
        { title: 'Optional: Express Delivery ($50)' },
        { title: 'Optional: Raw Files ($500)' },
      ],
      price: '$270',
    },
    {
      title: 'Custom Package',
      description: [
        { title: 'Custom Photoshoot' },
        { title: 'Includes Standard Editing' },
        { title: 'Optional: Premium Retouching ($30/image)' },
        { title: 'Optional: Express Delivery ($50)' },
        { title: 'Optional: Raw Files ($500)' },
      ],
      price: 'Contact for Pricing',
    },
  ],
  [Category.Events]: [
    {
      title: 'Photos or Video',
      description: [
        { title: 'Only Photos or Video' },
        { title: 'Includes Standard Editing' },
        { title: '2 Revisions' },
        { title: 'Optional: Extra Photographer ($25/hr)' },
        { title: 'Optional: Premium Retouching ($30/image)' },
        { title: 'Optional: Express Delivery ($50)' },
        { title: 'Optional: Raw Files ($500)' },
      ],
      price: '$120/hr',
    },
    {
      title: 'Photo + Video',
      description: [
        { title: 'Photos and Video' },
        { title: 'Includes Standard Editing' },
        { title: '2 Revisions' },
        { title: 'Optional: Extra Photographer ($25/hr)' },
        { title: 'Optional: Premium Retouching ($30/image)' },
        { title: 'Optional: Express Delivery ($50)' },
        { title: 'Optional: Raw Files ($500)' },
      ],
      price: '$140/hr',
      bestValue: true,
    },
    {
      title: 'Custom Package',
      description: [
        { title: 'Custom Event' },
        { title: 'Custom Hours' },
        { title: 'Includes Standard Editing' },
        { title: 'Optional: Extra Photographer ($25/hr)' },
        { title: 'Optional: Premium Retouching ($30/image)' },
        { title: 'Optional: Express Delivery ($50)' },
        { title: 'Optional: Raw Files ($500)' },
      ],
      price: 'Contact for Pricing',
    },
  ],
  [Category.Cars]: [
    {
      title: 'Photos Only',
      description: [
        { title: '1 Hour Photoshoot' },
        { title: '1 Location' },
        { title: 'Car Only' },
        { title: 'Includes Standard Editing' },
        { title: '1 Revision' },
        { title: 'Optional: Premium Retouching ($30/image)' },
        { title: 'Optional: Express Delivery ($50)' },
        { title: 'Optional: Raw Files ($500)' },
      ],
      price: '$120',
    },
    {
      title: 'Photo & Video',
      description: [
        { title: '1 Hour Photoshoot' },
        { title: '1 Location' },
        { title: 'Car + Driver' },
        { title: 'Includes Standard Editing' },
        { title: '1 Revision' },
        { title: 'Optional: Premium Retouching ($30/image)' },
        { title: 'Optional: Express Delivery ($50)' },
        { title: 'Optional: Raw Files ($500)' },
      ],
      price: '$140',
    },
    {
      title: 'Custom Package',
      description: [
        { title: 'Custom Photoshoot' },
        { title: 'Includes Standard Editing' },
        { title: 'Optional: Premium Retouching ($30/image)' },
        { title: 'Optional: Express Delivery ($50)' },
        { title: 'Optional: Raw Files ($500)' },
      ],
      price: 'Contact for Pricing',
    },
  ],
};
