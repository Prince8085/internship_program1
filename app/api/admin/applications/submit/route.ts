import { NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, addDoc, getDocs, query, where, orderBy, limit } from 'firebase/firestore'

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const applicationData = {
      personalDetails: {
        fullName: formData.get('fullName') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
      },
      educationalBackground: {
        university: formData.get('university') as string,
        studentId: formData.get('studentId') as string,
        course: formData.get('course') as string,
        semester: formData.get('semester') as string,
      },
      internshipDetails: {
        startDate: formData.get('startDate') as string,
        areasOfInterest: JSON.parse(formData.get('areasOfInterest') as string),
        skills: JSON.parse(formData.get('skills') as string),
        projectIdea: formData.get('projectIdea') as string,
      },
      status: 'pending',
      appliedDate: new Date().toISOString(),
      paymentDetails: {
        status: 'completed',
        amount: formData.get('referredBy') ? 2200 : 2500,
        referredBy: formData.get('referredBy') as string || null,
      }
    };

    // Store the application in Firestore
    const docRef = await addDoc(collection(db, 'applications'), applicationData);
    
    console.log('Application stored successfully:', docRef.id);
    
    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
      applicationId: docRef.id
    });

  } catch (error) {
    console.error('Error processing application:', error);
    return NextResponse.json({
      success: false,
      message: "Error processing application. Please try again."
    }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const status = searchParams.get('status');
    const pageSize = 10;

    let applicationsQuery = query(collection(db, 'applications'), orderBy('appliedDate', 'desc'));

    if (status && status !== 'all') {
      applicationsQuery = query(applicationsQuery, where('status', '==', status));
    }

    const snapshot = await getDocs(applicationsQuery);
    const applications = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Calculate pagination
    const totalApplications = applications.length;
    const totalPages = Math.ceil(totalApplications / pageSize);
    const startIndex = (page - 1) * pageSize;
    const paginatedApplications = applications.slice(startIndex, startIndex + pageSize);

    // Calculate dashboard metrics
    const metrics = {
      totalApplications,
      pendingReview: applications.filter(app => app.status === 'pending').length,
      approved: applications.filter(app => app.status === 'approved').length,
      totalRevenue: applications.reduce((sum, app) => sum + app.paymentDetails.amount, 0)
    };

    return NextResponse.json({
      success: true,
      applications: paginatedApplications,
      totalPages,
      totalApplications,
      metrics
    });

  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json({
      success: false,
      message: "Error fetching applications"
    }, { status: 500 });
  }
}

