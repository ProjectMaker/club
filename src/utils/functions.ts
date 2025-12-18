import moment from "moment"
import { 
  MATERIAL_CATEGORIES, 
  MATERIAL_SUBCATEGORIES, 
  MATERIAL_BRANDS,
  MATERIAL_PERCENTS_COM
} from "@/utils/constants"

export const formatDate = (dateString: string, withTime: boolean = false) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      ...(withTime && {
        hour: '2-digit',
        minute: '2-digit',
      }),
  });
};

export const getStatusLabel = (status: string) => {
  switch (status) {
      case 'available': return 'Disponible';
      case 'sold': return 'Vendu';
      case 'reserved': return 'Réservé';
      default: return status;
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
      case 'available': return 'text-green-400';
      case 'sold': return 'text-red-400';
      case 'reserved': return 'text-orange-400';
      default: return 'text-gray-400';
  }
};

export const getCategoryLabel = (categoryName: string) => {
  const category = MATERIAL_CATEGORIES.find(cat => cat.name === categoryName);
  return category ? category.label : categoryName;
};

export const getSubcategoryLabel = (subcategoryName: string) => {
  const subcategory = MATERIAL_SUBCATEGORIES.find(sub => sub.name === subcategoryName);
  return subcategory ? subcategory.label : subcategoryName;
};

export const getBrandLabel = (brandName: string) => {
  const brand = MATERIAL_BRANDS.find(b => b.name === brandName);
  return brand ? brand.label : brandName;
};

export const calculateMaterialPrices = ({ price, quantity }: { price: number, quantity: number }) => {
  if (!price || !quantity) {
      return {
          total: 0,
          com: 0,
          sales: 0
      }
  }
  const percents = MATERIAL_PERCENTS_COM.find(({ priceMin, priceMax }) => {
      return price >= priceMin && price < (priceMax || price + 1)
  })
  const totalPrice = price * quantity
  const com = totalPrice * (percents?.com || 0)
  const salesPrice = totalPrice + com

  return {
      total: totalPrice,
      com: com.toFixed(2),
      sales: salesPrice.toFixed(2)
  }
}

export const generateRanges = ({
  startsAt,
  endsAt,
  scale,
  withStartOf = false
}: {
  startsAt: string | Date | moment.Moment,
  endsAt: string | Date | moment.Moment,
  scale: moment.unitOfTime.Diff,
  withStartOf?: boolean
}) => {
  const startOf = scale === 'hour' ? 'day' : scale;
  const start = withStartOf ? moment(startsAt).startOf(startOf) : moment(startsAt);
  const end = withStartOf ? moment(endsAt).endOf(startOf) : moment(endsAt);
  const ranges: { from: string; to: string }[] = [];

  const monthsDiff = end.diff(start, scale);
  for (let i = 0; i <= monthsDiff; i++) {
    const rangeStart = moment(start).add(i, scale).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    const rangeEnd = moment(start).add(i + 1, scale).format('YYYY-MM-DDTHH:mm:ss.SSSZ');

    ranges.push({
      from: rangeStart,
      to: rangeEnd
    });
  }

  return ranges;
};

export const getScale = (period: string): moment.unitOfTime.Diff => {
  if (period === '1day') {
    return 'hour'
  } else if (period === '3days') {
    return 'hour'
  } else if (period === '7days') {
    return 'day'
  } else if (period === '1month') {
    return 'day'
  }
  return 'month'
}

export const getStartsAt = (period: string) => {
  let startsAt = moment().add(-1, 'year')
  if (period === '1day') {
    startsAt = moment().add(-1, 'day')
  } else if (period === '3days') {
    startsAt = moment().add(-3, 'day')
  } else if (period === '7days') {
    startsAt = moment().add(-7, 'day')
  } else if (period === '1month') {
    startsAt = moment().add(-1, 'month')
  }
  return startsAt
}