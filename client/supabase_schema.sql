-- ==========================================
-- Hotel OS - Supabase Database Schema & Setup
-- ==========================================

-- 1. Create Room Bookings Table
CREATE TABLE IF NOT EXISTS public.room_bookings (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    room_type TEXT NOT NULL,
    check_in_date DATE NOT NULL,
    check_in_time TIME NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Banquet Enquiries Table
CREATE TABLE IF NOT EXISTS public.banquet_enquiries (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    event_type TEXT NOT NULL,
    event_date DATE NOT NULL,
    guest_count INT NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Food Orders Table
CREATE TABLE IF NOT EXISTS public.food_orders (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    total_amount NUMERIC(10, 2) NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Room Availability Check Stored Procedure (RPC)
CREATE OR REPLACE FUNCTION public.is_room_available(
    p_room_type TEXT,
    p_check_in_date DATE,
    p_check_in_time TIME
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_existing_count INT;
BEGIN
    SELECT COUNT(*)
    INTO v_existing_count
    FROM public.room_bookings
    WHERE room_type = p_room_type
      AND check_in_date = p_check_in_date
      AND status IN ('pending', 'confirmed');

    IF v_existing_count > 0 THEN
        RETURN FALSE;
    ELSE
        RETURN TRUE;
    END IF;
END;
$$;

-- 5. Enable Row Level Security (RLS) & Public Policies (Allows client app read/write)
ALTER TABLE public.room_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banquet_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_orders ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts & selects for customer & admin app
CREATE POLICY "Allow public insert to room_bookings" ON public.room_bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select from room_bookings" ON public.room_bookings FOR SELECT USING (true);
CREATE POLICY "Allow public update to room_bookings" ON public.room_bookings FOR UPDATE USING (true);

CREATE POLICY "Allow public insert to banquet_enquiries" ON public.banquet_enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select from banquet_enquiries" ON public.banquet_enquiries FOR SELECT USING (true);
CREATE POLICY "Allow public update to banquet_enquiries" ON public.banquet_enquiries FOR UPDATE USING (true);

CREATE POLICY "Allow public insert to food_orders" ON public.food_orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select from food_orders" ON public.food_orders FOR SELECT USING (true);
CREATE POLICY "Allow public update to food_orders" ON public.food_orders FOR UPDATE USING (true);

-- 6. Add Tables to Realtime Publication (For Live Admin Dashboard Alerts)
ALTER PUBLICATION supabase_realtime ADD TABLE public.room_bookings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.banquet_enquiries;
ALTER PUBLICATION supabase_realtime ADD TABLE public.food_orders;
