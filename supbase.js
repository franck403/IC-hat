// full poly fill to not rewrite full code to be made bette
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Initialize Supabase
const supabaseUrl = "https://svygdqzlofupysrsmjlo.supabase.co";  // Replace with your Supabase URL
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2eWdkcXpsb2Z1cHlzcnNtamxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3MDQzNzEsImV4cCI6MjA1NzI4MDM3MX0.2ayGMQDVcoiwc0TCQpvQoz9Uo2gqA1GuVsHm078VZok";  // Replace with your Supabase API key
const supabase = createClient(supabaseUrl, supabaseKey);

// Fake Firebase App Initialization
export function initializeApp(config) {
    return { name: "FakeFirebaseApp", config };
}

// Fake getDatabase
export function getDatabase(app) {
    return { app };
}

// Fake ref - Represents a database reference
export function ref(database, path) {
    return { path };
}

// Fake set - Insert or overwrite data
export async function set(reference, value) {
    const { error } = await supabase
        .from(reference.path)
        .upsert([{ id: value.id || crypto.randomUUID(), ...value }]);

    if (error) throw new Error(error.message);
}

// Fake push - Simulate pushing new child data
export async function push(reference, value) {
    const newId = crypto.randomUUID();
    await set({ path: reference.path }, { id: newId, ...value });
    return { key: newId };
}

// Fake child - Get child path
export function child(reference, subPath) {
    return { path: `${reference.path}/${subPath}` };
}

// Fake update - Partially update a record
export async function update(reference, value) {
    const { error } = await supabase
        .from(reference.path)
        .update(value)
        .eq("id", value.id);

    if (error) throw new Error(error.message);
}

// Fake onChildAdded - Listen for new entries
export function onChildAdded(reference, callback) {
    supabase
        .channel(`realtime:${reference.path}`)
        .on("postgres_changes", { event: "INSERT", schema: "public", table: reference.path }, (payload) => {
            callback({ key: payload.new.id, val: () => payload.new });
        })
        .subscribe();
}

// Fake onChildChanged - Listen for updates
export function onChildChanged(reference, callback) {
    supabase
        .channel(`realtime:${reference.path}`)
        .on("postgres_changes", { event: "UPDATE", schema: "public", table: reference.path }, (payload) => {
            callback({ key: payload.new.id, val: () => payload.new });
        })
        .subscribe();
}

// Fake onDisconnect - No direct equivalent, but can be simulated
export function onDisconnect(reference) {
    console.warn("onDisconnect() is not natively supported in Supabase.");
    return {
        remove: async () => console.warn("onDisconnect().remove() is a no-op in Supabase."),
        cancel: () => console.warn("onDisconnect().cancel() is a no-op in Supabase.")
    };
}
